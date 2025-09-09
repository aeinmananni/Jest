import app from "./app";
import "dotenv-safe/config";
import "./redisController/subscriber";
const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on Port : ${port}`));
