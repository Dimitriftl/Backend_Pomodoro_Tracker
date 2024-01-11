export default async function runServer(app: any) {
  process.on("unhandledRejection", (reason, p) =>
    console.error("Unhandled Rejection at: Promise ", reason)
  );
  console.info(`Configuring HTTP server with at port ${3000}`);
  await app.listen(3000);
  console.info("Server started listening");
}
