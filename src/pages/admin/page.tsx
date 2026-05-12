import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { ConvexError } from "convex/values";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  Star,
  Eye,
  EyeOff,
  Trash2,
  BarChart3,
  MessageSquare,
  ClipboardList,
  Lock,
  Users,
  ShieldAlert,
  Timer,
  ArrowLeft,
  Plus,
  Save,
  Home,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import type { Id } from "@/convex/_generated/dataModel.d.ts";
import {
  DEFAULT_SERVICES,
  SERVICE_CATEGORIES,
  SERVICE_CATEGORY_LABELS,
  type EditableService,
  type ServiceCategory,
} from "../_lib/services-data.ts";
import {
  DEFAULT_PROPERTIES,
  type EditableProperty,
} from "../_lib/properties-data.ts";
import { SERVICE_ICON_MAP } from "../_lib/content-icons.ts";
import {
  deleteProperty,
  deleteService,
  deleteSubmission,
  saveProperty,
  saveService,
  updateSubmissionStatus,
  useAdminStore,
  type StoredProperty,
  type StoredService,
  type StoredSubmission,
} from "../_lib/admin-store.ts";
const ADMIN_PASSWORD = "1122334455";
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 60 * 60 * 1000; // 60 minutes
const STORAGE_KEY_REMEMBER = "nadom_admin_remember";
const STORAGE_KEY_LOCKOUT = "nadom_admin_lockout";
const HAS_CONVEX_BACKEND = Boolean(import.meta.env.VITE_CONVEX_URL);

type AdminSubmission = StoredSubmission;
type AdminService = StoredService;
type AdminProperty = StoredProperty;

type LockoutData = {
  attempts: number;
  lockedUntil: number | null;
};

function getLockoutData(): LockoutData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCKOUT);
    if (raw) return JSON.parse(raw) as LockoutData;
  } catch {
    // corrupted data, reset
  }
  return { attempts: 0, lockedUntil: null };
}

function setLockoutData(data: LockoutData) {
  localStorage.setItem(STORAGE_KEY_LOCKOUT, JSON.stringify(data));
}

function clearLockoutData() {
  localStorage.removeItem(STORAGE_KEY_LOCKOUT);
}

// ── Password gate ──────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [lockout, setLockout] = useState<LockoutData>(getLockoutData);
  const [remainingTime, setRemainingTime] = useState("");

  const isLocked =
    lockout.lockedUntil !== null && Date.now() < lockout.lockedUntil;

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY_REMEMBER) === "true") {
      onUnlock();
    }
  }, [onUnlock]);

  useEffect(() => {
    if (!isLocked) return;

    const tick = () => {
      const diff = (lockout.lockedUntil ?? 0) - Date.now();
      if (diff <= 0) {
        const reset: LockoutData = { attempts: 0, lockedUntil: null };
        setLockoutData(reset);
        setLockout(reset);
        setRemainingTime("");
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setRemainingTime(
        `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isLocked, lockout.lockedUntil]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isLocked) return;

      if (password === ADMIN_PASSWORD) {
        clearLockoutData();
        if (rememberMe) {
          localStorage.setItem(STORAGE_KEY_REMEMBER, "true");
        }
        onUnlock();
      } else {
        const newAttempts = lockout.attempts + 1;
        const newLockout: LockoutData =
          newAttempts >= MAX_ATTEMPTS
            ? { attempts: newAttempts, lockedUntil: Date.now() + LOCKOUT_MS }
            : { attempts: newAttempts, lockedUntil: null };
        setLockoutData(newLockout);
        setLockout(newLockout);
        setError(true);
        setPassword("");
      }
    },
    [password, rememberMe, isLocked, lockout.attempts, onUnlock],
  );

  const attemptsLeft = MAX_ATTEMPTS - lockout.attempts;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[oklch(0.15_0.04_250)] to-[oklch(0.10_0.03_250)]">
      <Card className="w-full max-w-sm border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
            {isLocked ? (
              <ShieldAlert className="size-8 text-red-400" />
            ) : (
              <Lock className="size-8 text-white/70" />
            )}
          </div>
          <CardTitle className="text-white text-xl">Админ панел</CardTitle>
          <p className="text-white/50 text-sm mt-1">
            {isLocked
              ? "Достъпът е временно заключен"
              : "Въведете парола за достъп"}
          </p>
        </CardHeader>
        <CardContent>
          {isLocked ? (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-red-400">
                <Timer className="size-5" />
                <span className="text-2xl font-mono font-bold tabular-nums">
                  {remainingTime}
                </span>
              </div>
              <p className="text-white/40 text-sm">
                Твърде много грешни опити. Изчакайте 60 минути преди да опитате
                отново.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Парола"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                autoFocus
              />
              {error && (
                <p className="text-red-400 text-sm">
                  Грешна парола.{" "}
                  {attemptsLeft > 0
                    ? `Остават ${attemptsLeft} ${attemptsLeft === 1 ? "опит" : "опита"}.`
                    : ""}
                </p>
              )}

              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                  className="border-white/30 data-[state=checked]:bg-white data-[state=checked]:text-[oklch(0.15_0.04_250)]"
                />
                <Label
                  htmlFor="remember-me"
                  className="text-sm text-white/60 cursor-pointer select-none"
                >
                  Запомни ме
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-white text-[oklch(0.15_0.04_250)] hover:bg-white/90 font-bold"
              >
                Вход
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Sessions panel ─────────────────────────────────────────────

const TIME_FILTERS = [
  { label: "Днес", days: 1 },
  { label: "7 дни", days: 7 },
  { label: "14 дни", days: 14 },
  { label: "30 дни", days: 30 },
] as const;

const PAGE_LABELS: Record<string, string> = {
  "/": "Начална страница",
  "/domoupravitel": "Домоуправител",
  "/el-kasier": "Ел. Касиер",
  "/administrativni-uslugi": "Административни услуги",
};

function getPageLabel(page: string): string {
  if (PAGE_LABELS[page]) return PAGE_LABELS[page];
  if (page.startsWith("/imoti/")) return `Имот ${page.replace("/imoti/", "")}`;
  return page;
}

function OfflineBackendNotice({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardContent className="py-12 text-center">
          <ShieldAlert className="size-10 text-white/20 mx-auto mb-3" />
          <p className="text-white/60 max-w-xl mx-auto">
            Тази част се включва, когато сайтът е свързан с база данни. Услугите,
            имотите и подадените форми работят веднага в този админ панел.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function SessionsPanel() {
  if (!HAS_CONVEX_BACKEND) {
    return (
      <OfflineBackendNotice
        icon={<BarChart3 className="size-5" />}
        title="Сесии"
      />
    );
  }

  return <LiveSessionsPanel />;
}

function LiveSessionsPanel() {
  const [selectedDays, setSelectedDays] = useState<number>(7);
  const data = useQuery(api.analytics.getSessionCount, {
    days: selectedDays,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="size-5" />
          Сесии
        </h2>
        <div className="flex gap-2">
          {TIME_FILTERS.map((f) => (
            <Button
              key={f.days}
              size="sm"
              onClick={() => setSelectedDays(f.days)}
              className={
                selectedDays === f.days
                  ? "bg-white text-[oklch(0.15_0.04_250)] hover:bg-white/90 font-semibold"
                  : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              }
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>

      {data === undefined ? (
        <div className="space-y-4">
          <Skeleton className="h-28 w-full max-w-xs rounded-xl bg-white/10" />
          <Skeleton className="h-48 w-full rounded-xl bg-white/10" />
        </div>
      ) : (
        <>
          {/* Main homepage sessions card */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-md max-w-xs">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Users className="size-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold text-white tabular-nums">
                    {data.homepageSessions}
                  </p>
                  <p className="text-xs text-white/50">
                    Сесии на началната страница
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Per-page breakdown table */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white text-base">
                По страници
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {data.perPage.length === 0 ? (
                <p className="text-white/50 text-sm text-center py-8">
                  Няма данни за избрания период.
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-xs text-white/50 font-medium px-6 py-3">
                          Страница
                        </th>
                        <th className="text-right text-xs text-white/50 font-medium px-6 py-3">
                          Сесии
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.perPage.map((row) => (
                        <tr
                          key={row.page}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-3 text-sm text-white/80 font-medium">
                            {getPageLabel(row.page)}
                          </td>
                          <td className="px-6 py-3 text-sm text-white/60 text-right tabular-nums">
                            {row.sessions}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

// ── Reviews management panel ───────────────────────────────────

function ReviewsPanel() {
  if (!HAS_CONVEX_BACKEND) {
    return (
      <OfflineBackendNotice
        icon={<MessageSquare className="size-5" />}
        title="Управление на ревюта"
      />
    );
  }

  return <LiveReviewsPanel />;
}

function LiveReviewsPanel() {
  const reviews = useQuery(api.reviews.getAllReviews, {});
  const createReview = useMutation(api.reviews.createReview);
  const updateReview = useMutation(api.reviews.updateReview);
  const toggleVisibility = useMutation(api.reviews.toggleVisibility);
  const deleteReview = useMutation(api.reviews.deleteReview);
  const [editingReviewId, setEditingReviewId] = useState<Id<"reviews"> | null>(
    null,
  );
  const [reviewForm, setReviewForm] = useState({
    authorName: "",
    rating: 5,
    comment: "",
    isVisible: true,
  });

  const resetReviewForm = () => {
    setEditingReviewId(null);
    setReviewForm({
      authorName: "",
      rating: 5,
      comment: "",
      isVisible: true,
    });
  };

  const handleEditReview = (review: NonNullable<typeof reviews>[number]) => {
    setEditingReviewId(review._id);
    setReviewForm({
      authorName: review.authorName,
      rating: review.rating,
      comment: review.comment,
      isVisible: review.isVisible,
    });
  };

  const handleSaveReview = async () => {
    try {
      if (editingReviewId) {
        await updateReview({
          reviewId: editingReviewId,
          authorName: reviewForm.authorName,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          isVisible: reviewForm.isVisible,
        });
        toast.success("Ревюто е обновено.");
      } else {
        await createReview({
          authorName: reviewForm.authorName,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
          isVisible: reviewForm.isVisible,
        });
        toast.success("Ревюто е добавено.");
      }
      resetReviewForm();
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(message);
      } else {
        toast.error("Не успяхме да запазим ревюто.");
      }
    }
  };

  const handleToggle = async (reviewId: Id<"reviews">) => {
    try {
      await toggleVisibility({ reviewId });
      toast.success("Видимостта е променена.");
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(message);
      } else {
        toast.error("Възникна грешка.");
      }
    }
  };

  const handleDelete = async (reviewId: Id<"reviews">) => {
    try {
      await deleteReview({ reviewId });
      toast.success("Ревюто е изтрито.");
    } catch (error) {
      if (error instanceof ConvexError) {
        const { message } = error.data as { code: string; message: string };
        toast.error(message);
      } else {
        toast.error("Възникна грешка.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <MessageSquare className="size-5" />
        Управление на ревюта
        {reviews && (
          <span className="text-sm font-normal text-white/50 ml-2">
            ({reviews.length} общо)
          </span>
        )}
      </h2>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-base">
            {editingReviewId ? "Редакция на ревю" : "Ново ревю"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-[1fr_120px] gap-3">
            <Input
              value={reviewForm.authorName}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, authorName: e.target.value })
              }
              placeholder="Име на клиента"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              type="number"
              min={1}
              max={5}
              value={reviewForm.rating}
              onChange={(e) =>
                setReviewForm({
                  ...reviewForm,
                  rating: Math.max(1, Math.min(5, Number(e.target.value) || 1)),
                })
              }
              placeholder="Оценка"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <Textarea
            value={reviewForm.comment}
            onChange={(e) =>
              setReviewForm({ ...reviewForm, comment: e.target.value })
            }
            placeholder="Текст на ревюто"
            className="bg-white/10 border-white/20 text-white min-h-24"
          />
          <label className="flex items-center gap-2 text-sm text-white/70 px-2">
            <Checkbox
              checked={reviewForm.isVisible}
              onCheckedChange={(checked) =>
                setReviewForm({ ...reviewForm, isVisible: checked === true })
              }
            />
            Видимо на сайта
          </label>
          <div className="flex gap-2">
            <Button onClick={handleSaveReview} className="font-bold">
              <Save className="size-4 mr-1.5" />
              Запази
            </Button>
            {editingReviewId && (
              <Button
                variant="ghost"
                onClick={resetReviewForm}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Откажи
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {reviews === undefined ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl bg-white/10" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardContent className="py-12 text-center">
            <MessageSquare className="size-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">Все още няма ревюта.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <Card
              key={review._id}
              className={`border-white/10 backdrop-blur-md transition-all ${
                review.isVisible ? "bg-white/5" : "bg-white/[0.02] opacity-60"
              }`}
            >
              <CardContent className="pt-5 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {review.authorName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {review.authorName}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`size-3.5 ${
                              s <= review.rating
                                ? "fill-amber-400 text-amber-400"
                                : "fill-transparent text-white/20"
                            }`}
                          />
                        ))}
                      </div>
                      {!review.isVisible && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                          Скрито
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-white/70 leading-relaxed pl-11">
                      {review.comment}
                    </p>

                    <p className="text-xs text-white/30 mt-2 pl-11">
                      {new Date(review._creationTime).toLocaleDateString(
                        "bg-BG",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditReview(review)}
                      className="text-white/50 hover:text-white hover:bg-white/10 h-8 px-2"
                      title="Редактирай"
                    >
                      Редакция
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleToggle(review._id)}
                      className="text-white/50 hover:text-white hover:bg-white/10 h-8 w-8 p-0"
                      title={review.isVisible ? "Скрий" : "Покажи"}
                    >
                      {review.isVisible ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(review._id)}
                      className="text-red-400/70 hover:text-red-400 hover:bg-red-500/10 h-8 w-8 p-0"
                      title="Изтрий"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Form submissions panel ─────────────────────────────────────

function SubmissionsPanelContent({
  submissions,
  onStatus,
  onDelete,
}: {
  submissions: AdminSubmission[];
  onStatus: (submissionId: string, status: string) => void;
  onDelete: (submissionId: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <ClipboardList className="size-5" />
        Подадени форми
        {submissions && (
          <span className="text-sm font-normal text-white/50 ml-2">
            ({submissions.length} общо)
          </span>
        )}
      </h2>

      {submissions.length === 0 ? (
        <Card className="border-white/10 bg-white/5 backdrop-blur-md">
          <CardContent className="py-12 text-center">
            <ClipboardList className="size-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/50">Все още няма подадени заявки.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {submissions.map((submission) => (
            <Card
              key={submission.id}
              className="border-white/10 bg-white/5 backdrop-blur-md"
            >
              <CardContent className="pt-5">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-white">
                        {submission.fullName}
                      </h3>
                      <span className="text-xs text-white/50">
                        {new Date(submission.createdAt).toLocaleString("bg-BG")}
                      </span>
                      <span className="text-xs rounded-full bg-blue-500/15 text-blue-200 px-2 py-0.5">
                        {submission.status === "new"
                          ? "Нова"
                          : submission.status === "done"
                            ? "Обработена"
                            : "В процес"}
                      </span>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-white/65">
                      <p>
                        <span className="text-white/35">Услуга:</span>{" "}
                        {submission.service || "-"}
                      </p>
                      <p>
                        <span className="text-white/35">Адрес:</span>{" "}
                        {submission.address || "-"}
                      </p>
                      <p>
                        <span className="text-white/35">Регион:</span>{" "}
                        {submission.region || "-"}
                      </p>
                      <p>
                        <span className="text-white/35">Тип сграда:</span>{" "}
                        {submission.buildingType || "-"}
                      </p>
                    </div>
                    {submission.message && (
                      <p className="text-sm text-white/70 leading-relaxed">
                        {submission.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0">
                    <select
                      value={submission.status}
                      onChange={(e) =>
                        onStatus(submission.id, e.target.value)
                      }
                      className="h-9 rounded-lg bg-white/10 border border-white/15 text-white text-sm px-2"
                    >
                      <option value="new">Нова</option>
                      <option value="working">В процес</option>
                      <option value="done">Обработена</option>
                    </select>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(submission.id)}
                      className="text-red-400/80 hover:text-red-300 hover:bg-red-500/10 h-9 w-9 p-0"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function LocalSubmissionsPanel() {
  const { submissions } = useAdminStore();

  return (
    <SubmissionsPanelContent
      submissions={submissions}
      onStatus={(submissionId, status) => {
        updateSubmissionStatus(submissionId, status);
        toast.success("Статусът е обновен.");
      }}
      onDelete={(submissionId) => {
        deleteSubmission(submissionId);
        toast.success("Заявката е изтрита.");
      }}
    />
  );
}

function ConvexSubmissionsPanel() {
  const submissions = useQuery(api.formSubmissions.list, {
    adminPassword: ADMIN_PASSWORD,
  });
  const updateStatus = useMutation(api.formSubmissions.updateStatus);
  const removeSubmission = useMutation(api.formSubmissions.remove);

  if (submissions === undefined) {
    return <Skeleton className="h-40 w-full bg-white/10" />;
  }

  return (
    <SubmissionsPanelContent
      submissions={submissions.map((submission) => ({
        ...submission,
        id: submission._id,
      }))}
      onStatus={async (submissionId, status) => {
        await updateStatus({
          adminPassword: ADMIN_PASSWORD,
          submissionId: submissionId as Id<"formSubmissions">,
          status,
        });
        toast.success("Статусът е обновен.");
      }}
      onDelete={async (submissionId) => {
        await removeSubmission({
          adminPassword: ADMIN_PASSWORD,
          submissionId: submissionId as Id<"formSubmissions">,
        });
        toast.success("Заявката е изтрита.");
      }}
    />
  );
}

function SubmissionsPanel() {
  return HAS_CONVEX_BACKEND ? (
    <ConvexSubmissionsPanel />
  ) : (
    <LocalSubmissionsPanel />
  );
}

// ── Services management panel ──────────────────────────────────

const emptyService: EditableService = {
  category: "general",
  title: "",
  description: "",
  image: "",
  href: "",
  icon: "FileText",
  order: 1,
  isVisible: true,
};

function ServicesAdminPanelContent({
  services,
  onSave,
  onDelete,
}: {
  services: AdminService[];
  onSave: (service: EditableService & { id?: string }) => Promise<void> | void;
  onDelete: (serviceId: string) => Promise<void> | void;
}) {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("general");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<EditableService>(emptyService);

  const categoryServices = services.filter(
    (service) => service.category === activeCategory,
  );

  const startNew = () => {
    setSelectedId(null);
    setForm({
      ...emptyService,
      category: activeCategory,
      order: categoryServices.length + 1,
    });
  };

  const selectService = (service: AdminService) => {
    setSelectedId(service.id);
    setForm({
      category: service.category,
      title: service.title,
      description: service.description,
      image: service.image ?? "",
      href: service.href ?? "",
      icon: service.icon,
      order: service.order,
      isVisible: service.isVisible,
    });
  };

  const handleSaveService = async () => {
    try {
      const payload = {
        ...form,
        id: selectedId ?? undefined,
        image: form.image?.trim() || undefined,
        href: form.href?.trim() || undefined,
        title: form.title.trim(),
        description: form.description.trim(),
      };

      await onSave(payload);
      toast.success("Услугата е запазена.");
      startNew();
    } catch {
      toast.error("Не успяхме да запазим услугата.");
    }
  };

  const handleDeleteService = async () => {
    if (!selectedId) return;
    try {
      await onDelete(selectedId);
      toast.success("Услугата е изтрита.");
      startNew();
    } catch {
      toast.error("Не успяхме да изтрием услугата.");
    }
  };

  return (
    <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6">
      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-base">Услуги</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <select
            value={activeCategory}
            onChange={(e) => {
              setActiveCategory(e.target.value as ServiceCategory);
              setSelectedId(null);
              setForm({
                ...emptyService,
                category: e.target.value as ServiceCategory,
              });
            }}
            className="w-full h-10 rounded-lg bg-white/10 border border-white/15 text-white px-3 text-sm"
          >
            {SERVICE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {SERVICE_CATEGORY_LABELS[category]}
              </option>
            ))}
          </select>

          <Button
            onClick={startNew}
            className="w-full bg-white text-[oklch(0.15_0.04_250)] hover:bg-white/90 font-bold"
          >
            <Plus className="size-4 mr-1.5" />
            Нова услуга
          </Button>

          <div className="space-y-2 max-h-[520px] overflow-auto pr-1">
            {categoryServices.length === 0 ? (
              <p className="text-sm text-white/45 text-center py-6">
                Няма услуги в тази група.
              </p>
            ) : (
              categoryServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => selectService(service)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-colors ${
                    selectedId === service.id
                      ? "bg-white text-[oklch(0.15_0.04_250)] border-white"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold text-sm">{service.title}</p>
                  <p className="text-xs opacity-60 line-clamp-2">
                    {service.description || "Без описание"}
                  </p>
                </button>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-base">
            {selectedId ? "Редакция на услуга" : "Нова услуга"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Име на услугата"
            className="bg-white/10 border-white/20 text-white"
          />
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание"
            className="bg-white/10 border-white/20 text-white min-h-28"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={form.image ?? ""}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="URL на снимка"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              value={form.href ?? ""}
              onChange={(e) => setForm({ ...form, href: e.target.value })}
              placeholder="Линк"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="h-10 rounded-lg bg-white/10 border border-white/15 text-white px-3 text-sm"
            >
              {Object.keys(SERVICE_ICON_MAP).map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
            <Input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) || 1 })
              }
              placeholder="Ред"
              className="bg-white/10 border-white/20 text-white"
            />
            <label className="flex items-center gap-2 text-sm text-white/70 px-2">
              <Checkbox
                checked={form.isVisible}
                onCheckedChange={(checked) =>
                  setForm({ ...form, isVisible: checked === true })
                }
              />
              Видима
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveService} className="font-bold">
              <Save className="size-4 mr-1.5" />
              Запази
            </Button>
            {selectedId && (
              <Button
                onClick={handleDeleteService}
                variant="ghost"
                className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
              >
                <Trash2 className="size-4 mr-1.5" />
                Изтрий
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LocalServicesAdminPanel() {
  const { services } = useAdminStore();

  return (
    <ServicesAdminPanelContent
      services={services}
      onSave={(service) => saveService(service)}
      onDelete={(serviceId) => deleteService(serviceId)}
    />
  );
}

function ConvexServicesAdminPanel() {
  const services = useQuery(api.services.listAdmin, {
    adminPassword: ADMIN_PASSWORD,
  });
  const createService = useMutation(api.services.create);
  const updateService = useMutation(api.services.update);
  const removeService = useMutation(api.services.remove);
  const seedDefaults = useMutation(api.services.seedDefaults);

  if (services === undefined) {
    return <Skeleton className="h-80 w-full bg-white/10" />;
  }

  const normalizedServices = services.map((service) => ({
    ...service,
    id: service._id,
    category: service.category as ServiceCategory,
  }));

  return (
    <div className="space-y-4">
      {services.length === 0 && (
        <Button
          onClick={async () => {
            await seedDefaults({
              adminPassword: ADMIN_PASSWORD,
              services: DEFAULT_SERVICES,
            });
            toast.success("Началните услуги са добавени в Convex.");
          }}
          className="font-bold"
        >
          Добави началните услуги
        </Button>
      )}
      <ServicesAdminPanelContent
        services={normalizedServices}
        onSave={async (payload) => {
          const { id, ...service } = payload;
          if (id) {
            await updateService({
              adminPassword: ADMIN_PASSWORD,
              serviceId: id as Id<"services">,
              service,
            });
          } else {
            await createService({
              adminPassword: ADMIN_PASSWORD,
              service,
            });
          }
        }}
        onDelete={async (serviceId) => {
          await removeService({
            adminPassword: ADMIN_PASSWORD,
            serviceId: serviceId as Id<"services">,
          });
        }}
      />
    </div>
  );
}

function ServicesAdminPanel() {
  return HAS_CONVEX_BACKEND ? (
    <ConvexServicesAdminPanel />
  ) : (
    <LocalServicesAdminPanel />
  );
}

// ── Properties management panel ────────────────────────────────

const emptyProperty: EditableProperty = {
  slug: "",
  type: "",
  title: "",
  location: "",
  area: 0,
  rooms: "",
  year: new Date().getFullYear(),
  material: "",
  price: "",
  phone: "0876 590 580",
  description: "",
  image: "",
  gallery: [],
  order: 1,
  isVisible: true,
};

function PropertiesAdminPanelContent({
  properties,
  onSave,
  onDelete,
}: {
  properties: AdminProperty[];
  onSave: (property: EditableProperty & { id?: string }) => Promise<void> | void;
  onDelete: (propertyId: string) => Promise<void> | void;
}) {
  const sortedProperties = [...properties].sort((a, b) => a.order - b.order);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<EditableProperty>(emptyProperty);
  const [galleryText, setGalleryText] = useState("");

  const startNew = () => {
    const nextOrder = properties.length + 1;
    setSelectedId(null);
    setForm({ ...emptyProperty, order: nextOrder });
    setGalleryText("");
  };

  const selectProperty = (property: AdminProperty) => {
    setSelectedId(property.id);
    setForm({
      slug: property.slug,
      type: property.type,
      title: property.title,
      location: property.location,
      area: property.area,
      rooms: property.rooms,
      year: property.year,
      material: property.material,
      price: property.price,
      phone: property.phone,
      description: property.description,
      image: property.image,
      gallery: property.gallery,
      order: property.order,
      isVisible: property.isVisible,
    });
    setGalleryText(property.gallery.join("\n"));
  };

  const handleSaveProperty = async () => {
    try {
      const gallery = galleryText
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      const payload = {
        ...form,
        id: selectedId ?? undefined,
        slug: form.slug.trim() || crypto.randomUUID().slice(0, 8),
        type: form.type.trim(),
        title: form.title.trim(),
        location: form.location.trim(),
        rooms: form.rooms.trim(),
        material: form.material.trim(),
        price: form.price.trim(),
        phone: form.phone.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        gallery: gallery.length > 0 ? gallery : [form.image.trim()],
      };

      await onSave(payload);
      toast.success("Имотът е запазен.");
      startNew();
    } catch {
      toast.error("Не успяхме да запазим имота.");
    }
  };

  const handleDeleteProperty = async () => {
    if (!selectedId) return;
    try {
      await onDelete(selectedId);
      toast.success("Имотът е изтрит.");
      startNew();
    } catch {
      toast.error("Не успяхме да изтрием имота.");
    }
  };

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6">
      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-base">Имоти</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={startNew}
            className="w-full bg-white text-[oklch(0.15_0.04_250)] hover:bg-white/90 font-bold"
          >
            <Plus className="size-4 mr-1.5" />
            Нов имот
          </Button>

          <div className="space-y-2 max-h-[560px] overflow-auto pr-1">
            {sortedProperties.length === 0 ? (
              <p className="text-sm text-white/45 text-center py-6">
                Зареждам началните имоти...
              </p>
            ) : (
              sortedProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => selectProperty(property)}
                  className={`w-full text-left rounded-xl border p-3 transition-colors flex gap-3 ${
                    selectedId === property.id
                      ? "bg-white text-[oklch(0.15_0.04_250)] border-white"
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block font-semibold text-sm line-clamp-1">
                      {property.title}
                    </span>
                    <span className="block text-xs opacity-60 line-clamp-1">
                      {property.location}
                    </span>
                    {!property.isVisible && (
                      <span className="text-[10px] text-red-300">Скрит</span>
                    )}
                  </span>
                </button>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/5 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-white text-base">
            {selectedId ? "Редакция на имот" : "Нов имот"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="URL име, напр. 3-staen-centar"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              placeholder="Тип, напр. 3-СТАЕН"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <Input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Заглавие"
            className="bg-white/10 border-white/20 text-white"
          />
          <Input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Локация"
            className="bg-white/10 border-white/20 text-white"
          />
          <div className="grid sm:grid-cols-4 gap-3">
            <Input
              type="number"
              value={form.area}
              onChange={(e) =>
                setForm({ ...form, area: Number(e.target.value) || 0 })
              }
              placeholder="Площ"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              value={form.rooms}
              onChange={(e) => setForm({ ...form, rooms: e.target.value })}
              placeholder="Стаи"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              type="number"
              value={form.year}
              onChange={(e) =>
                setForm({ ...form, year: Number(e.target.value) || 0 })
              }
              placeholder="Година"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              value={form.material}
              onChange={(e) => setForm({ ...form, material: e.target.value })}
              placeholder="Материал"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Input
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Цена"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Телефон"
              className="bg-white/10 border-white/20 text-white"
            />
            <Input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm({ ...form, order: Number(e.target.value) || 1 })
              }
              placeholder="Ред"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          <Input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="Основна снимка URL"
            className="bg-white/10 border-white/20 text-white"
          />
          <Textarea
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
            placeholder="Галерия - по един URL на ред"
            className="bg-white/10 border-white/20 text-white min-h-24"
          />
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Описание"
            className="bg-white/10 border-white/20 text-white min-h-28"
          />
          <label className="flex items-center gap-2 text-sm text-white/70 px-2">
            <Checkbox
              checked={form.isVisible}
              onCheckedChange={(checked) =>
                setForm({ ...form, isVisible: checked === true })
              }
            />
            Видим на сайта
          </label>
          <div className="flex gap-2 pt-2">
            <Button onClick={handleSaveProperty} className="font-bold">
              <Save className="size-4 mr-1.5" />
              Запази
            </Button>
            {selectedId && (
              <Button
                onClick={handleDeleteProperty}
                variant="ghost"
                className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
              >
                <Trash2 className="size-4 mr-1.5" />
                Изтрий
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LocalPropertiesAdminPanel() {
  const { properties } = useAdminStore();

  return (
    <PropertiesAdminPanelContent
      properties={properties}
      onSave={(property) => saveProperty(property)}
      onDelete={(propertyId) => deleteProperty(propertyId)}
    />
  );
}

function ConvexPropertiesAdminPanel() {
  const properties = useQuery(api.properties.listAdmin, {
    adminPassword: ADMIN_PASSWORD,
  });
  const createProperty = useMutation(api.properties.create);
  const updateProperty = useMutation(api.properties.update);
  const removeProperty = useMutation(api.properties.remove);
  const seedDefaults = useMutation(api.properties.seedDefaults);

  if (properties === undefined) {
    return <Skeleton className="h-80 w-full bg-white/10" />;
  }

  const normalizedProperties = properties.map((property) => ({
    ...property,
    id: property._id,
  }));

  return (
    <div className="space-y-4">
      {properties.length === 0 && (
        <Button
          onClick={async () => {
            await seedDefaults({
              adminPassword: ADMIN_PASSWORD,
              properties: DEFAULT_PROPERTIES,
            });
            toast.success("Началните имоти са добавени в Convex.");
          }}
          className="font-bold"
        >
          Добави началните имоти
        </Button>
      )}
      <PropertiesAdminPanelContent
        properties={normalizedProperties}
        onSave={async (payload) => {
          const { id, ...property } = payload;
          if (id) {
            await updateProperty({
              adminPassword: ADMIN_PASSWORD,
              propertyId: id as Id<"properties">,
              property,
            });
          } else {
            await createProperty({
              adminPassword: ADMIN_PASSWORD,
              property,
            });
          }
        }}
        onDelete={async (propertyId) => {
          await removeProperty({
            adminPassword: ADMIN_PASSWORD,
            propertyId: propertyId as Id<"properties">,
          });
        }}
      />
    </div>
  );
}

function PropertiesAdminPanel() {
  return HAS_CONVEX_BACKEND ? (
    <ConvexPropertiesAdminPanel />
  ) : (
    <LocalPropertiesAdminPanel />
  );
}

// ── Main admin page ────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "sessions" | "forms" | "services" | "properties" | "reviews"
  >("forms");

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[oklch(0.15_0.04_250)] to-[oklch(0.10_0.03_250)]">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight">
                Админ панел
              </h1>
              <p className="text-sm text-white/40 mt-0.5">NADOM.BG</p>
            </div>
            <Link to="/">
              <Button
                size="sm"
                className="bg-white/10 text-white/70 hover:bg-white/20 border border-white/10"
              >
                <ArrowLeft className="size-3.5 mr-1.5" />
                Към сайта
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
          <button
            onClick={() => setActiveTab("forms")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "forms"
                ? "bg-white text-[oklch(0.15_0.04_250)] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <ClipboardList className="size-4 inline mr-1.5 -mt-0.5" />
            Форми
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "services"
                ? "bg-white text-[oklch(0.15_0.04_250)] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <ListChecks className="size-4 inline mr-1.5 -mt-0.5" />
            Услуги
          </button>
          <button
            onClick={() => setActiveTab("properties")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "properties"
                ? "bg-white text-[oklch(0.15_0.04_250)] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <Home className="size-4 inline mr-1.5 -mt-0.5" />
            Имоти
          </button>
          <button
            onClick={() => setActiveTab("sessions")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "sessions"
                ? "bg-white text-[oklch(0.15_0.04_250)] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <BarChart3 className="size-4 inline mr-1.5 -mt-0.5" />
            Сесии
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              activeTab === "reviews"
                ? "bg-white text-[oklch(0.15_0.04_250)] shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <MessageSquare className="size-4 inline mr-1.5 -mt-0.5" />
            Ревюта
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "forms" && <SubmissionsPanel />}
        {activeTab === "services" && <ServicesAdminPanel />}
        {activeTab === "properties" && <PropertiesAdminPanel />}
        {activeTab === "sessions" && <SessionsPanel />}
        {activeTab === "reviews" && <ReviewsPanel />}
      </main>
    </div>
  );
}
