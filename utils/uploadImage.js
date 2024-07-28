const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
const SUPABASE_BUCKET_NAME = "polka";
const PUBLIC_URL_PREFIX = "https://iwyakhyushalxztqevjs.supabase.co/storage/v1/object/public/"
// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Function to upload image from URL to Supabase bucket
// Function to extract filename from URL
function getFileNameFromUrl(url) {
  return new URL(url).pathname.split("/").pop();
}

// Function to upload image from URL to Supabase bucket
async function uploadImageToSupabase(imageUrl) {
  const fileName = getFileNameFromUrl(imageUrl);
  try {
    // Download the image from the URL
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Upload the image to Supabase bucket
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET_NAME)
      .upload(fileName, imageBuffer, {
        contentType: response.headers["content-type"],
      });

    if (error) {
      throw error;
    }

    console.log("Image uploaded successfully:", data);


    console.log("Public URL:", PUBLIC_URL_PREFIX + data.fullPath);
    return data.fullPath ? PUBLIC_URL_PREFIX + data.fullPath : "";
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

module.exports = uploadImageToSupabase