import { useSyncExternalStore } from "react";
import {
  DEFAULT_PROPERTIES,
  type EditableProperty,
} from "./properties-data.ts";
import { DEFAULT_SERVICES, type EditableService } from "./services-data.ts";

const STORAGE_KEY = "nadom_admin_content";
const STORE_EVENT = "nadom_admin_content_change";

export type StoredService = EditableService & { id: string };
export type StoredProperty = EditableProperty & { id: string };
export type StoredSubmission = {
  id: string;
  fullName: string;
  service: string;
  address: string;
  region: string;
  buildingType: string;
  message: string;
  status: string;
  createdAt: string;
};

export type AdminStore = {
  services: StoredService[];
  properties: StoredProperty[];
  submissions: StoredSubmission[];
};

function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
}

function defaultStore(): AdminStore {
  return {
    services: DEFAULT_SERVICES.map((service, index) => ({
      ...service,
      id: `service-${index + 1}`,
    })),
    properties: DEFAULT_PROPERTIES.map((property, index) => ({
      ...property,
      id: `property-${index + 1}`,
    })),
    submissions: [],
  };
}

function loadStore(): AdminStore {
  if (typeof window === "undefined") return defaultStore();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = defaultStore();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw) as Partial<AdminStore>;
    return {
      ...defaultStore(),
      ...parsed,
      services: parsed.services?.length
        ? parsed.services
        : defaultStore().services,
      properties: parsed.properties?.length
        ? parsed.properties
        : defaultStore().properties,
      submissions: parsed.submissions ?? [],
    };
  } catch {
    return defaultStore();
  }
}

let storeCache: AdminStore | null = null;

function readStore(): AdminStore {
  if (storeCache === null) {
    storeCache = loadStore();
  }
  return storeCache;
}

function writeStore(updater: (current: AdminStore) => AdminStore) {
  const next = updater(readStore());
  storeCache = next;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function subscribe(callback: () => void) {
  const handleStorage = () => {
    storeCache = loadStore();
    callback();
  };

  window.addEventListener(STORE_EVENT, callback);
  window.addEventListener("storage", handleStorage);
  return () => {
    window.removeEventListener(STORE_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function useAdminStore() {
  return useSyncExternalStore(subscribe, readStore, defaultStore);
}

export function createSubmission(
  submission: Omit<StoredSubmission, "id" | "status" | "createdAt">,
) {
  writeStore((current) => ({
    ...current,
    submissions: [
      {
        ...submission,
        id: createId(),
        status: "new",
        createdAt: new Date().toISOString(),
      },
      ...current.submissions,
    ],
  }));
}

export function updateSubmissionStatus(id: string, status: string) {
  writeStore((current) => ({
    ...current,
    submissions: current.submissions.map((submission) =>
      submission.id === id ? { ...submission, status } : submission,
    ),
  }));
}

export function deleteSubmission(id: string) {
  writeStore((current) => ({
    ...current,
    submissions: current.submissions.filter(
      (submission) => submission.id !== id,
    ),
  }));
}

export function saveService(service: EditableService & { id?: string }) {
  writeStore((current) => {
    const id = service.id ?? createId();
    const nextService = { ...service, id };
    const exists = current.services.some((item) => item.id === id);
    return {
      ...current,
      services: exists
        ? current.services.map((item) => (item.id === id ? nextService : item))
        : [...current.services, nextService],
    };
  });
}

export function deleteService(id: string) {
  writeStore((current) => ({
    ...current,
    services: current.services.filter((service) => service.id !== id),
  }));
}

export function saveProperty(property: EditableProperty & { id?: string }) {
  writeStore((current) => {
    const id = property.id ?? createId();
    const nextProperty = { ...property, id };
    const exists = current.properties.some((item) => item.id === id);
    return {
      ...current,
      properties: exists
        ? current.properties.map((item) =>
            item.id === id ? nextProperty : item,
          )
        : [...current.properties, nextProperty],
    };
  });
}

export function deleteProperty(id: string) {
  writeStore((current) => ({
    ...current,
    properties: current.properties.filter((property) => property.id !== id),
  }));
}
