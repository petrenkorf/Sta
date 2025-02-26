export const DBConfig = {
  name: "StaDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "events",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "event_type", keypath: "event_type", options: { unique: false } },
        { name: "event_target", keypath: "event_target", options: { unique: false } },
        { name: "event_payload", keypath: "event_payload", options: { unique: false } },
        { name: "timestamp", keypath: "timestamp", options: { unique: false } },
      ],
    },
  ],
};
