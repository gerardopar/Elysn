export const encodeCursor = (timestamp: number, id: string) =>
  Buffer.from(`${timestamp}:${id}`).toString("base64");

export const decodeCursor = (cursor: string) => {
  const decoded = Buffer.from(cursor, "base64").toString("utf8");
  const [timestamp, id] = decoded.split(":");
  return { timestamp: Number(timestamp), id };
};
