import "dotenv/config";

console.log("Mongo URI exists:", !!process.env.MONGO_URI);

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});