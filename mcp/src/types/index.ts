export interface ComponentMetadata {
  displayName: string;
  exportName: string;
  description: string;
  tags: Record<string, any>;
  props: Prop[];
  events: Event[];
  slots: Slot[];
  sourceFiles: string[];
  category?: string;
  builtDocPath?: string;
  searchRelevance?: number;
}

export interface Prop {
  name: string;
  description: string;
  type: { name: string; values?: string[] };
  required: boolean;
  defaultValue: { func: boolean; value: string | null };
  tags?: Record<string, any>;
}

export interface Event {
  name: string;
  description: string;
  type: { names: string[] };
}

export interface Slot {
  name: string;
  description?: string;
  scoped?: boolean;
  bindings?: { name: string; title: string }[];
}
