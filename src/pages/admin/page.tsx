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
  Lock,
  Users,
  ShieldAlert,
  Timer,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Label } from "@/components/ui/label.tsx";
import type { Id } from "@/convex/_generated/dataModel.d.ts";

const ADMIN_PASSWORD = "1122334455";
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 60 * 60 * 1000; // 60 minutes
const STORAGE_KEY_REMEMBER = "nadom_admin_remember";
const STORAGE_KEY_LOCKOUT = "nadom_admin_lockout";

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
                  onCheckedChange={(checked) =>
                    setRememberMe(checked === true)
                  }
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

function SessionsPanel() {
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
                  <p className="text-xs text-white/50">Сесии на началната страница</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Per-page breakdown table */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-white text-base">По страници</CardTitle>
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
  const reviews = useQuery(api.reviews.getAllReviews, {});
  const toggleVisibility = useMutation(api.reviews.toggleVisibility);
  const deleteReview = useMutation(api.reviews.deleteReview);

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
                      {new Date(review._creationTime).toLocaleDateString("bg-BG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
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

// ── Main admin page ────────────────────────────────────────────

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"sessions" | "reviews">("sessions");

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
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl w-fit border border-white/10">
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
        {activeTab === "sessions" ? <SessionsPanel /> : <ReviewsPanel />}
      </main>
    </div>
  );
}
