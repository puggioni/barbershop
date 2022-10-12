import app from "./app";
import port from "./app";

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
