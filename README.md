
## **What is Superclass?**
Superclass is an online platform where teachers and students can connect to learn better. It provides features like:
- Live interactive classes for teachers and students.
- Subject-specific videos for different subjects.
- Safe and secure access to content so that no unauthorized user can misuse it.

---

## **Where can people use Superclass?**
- It’s live on [superclasses.site](https://superclasses.site).  
- You can use it on phones, tablets, or computers as it’s designed to work perfectly on any device.

---

## **What are the main features of Superclass?**
### 1. **Login System (Authentication)**  
We make sure users can log in safely without the risk of someone stealing their data. 
- **Google Login:** You can log in using your Google account. It’s simple and secure.
- **Sessions:** Once logged in, you stay logged in safely until you choose to log out.

---

### 2. **Who Can Do What (Authorization and Roles)**  
We’ve assigned roles to users so everyone has access to only what they’re allowed:
- **Teacher:** Teachers can:
  - Start and stop live classes.
  - Upload subject videos.
  - Handle live chat (allow or disable it).
- **Student:** Students can:
  - Join live classes.
  - Access subject videos for learning.
  - Participate in live chat during sessions.
  
If a student tries to do something only a teacher is allowed to, they’ll be blocked.

---

### 3. **Role-Based Access Control (RBAC)**  
This system makes sure only the right people can access certain things:
- **For Teachers:** Teachers can manage their live sessions and videos. Students can’t see these controls.
- **For Students:** Students only see what they need, like joining live classes and watching videos.
  
When a user logs in, the app automatically checks their role and shows them what they are allowed to see or do.

---

### 4. **Live Classes (Using Vimeo)**  
Live classes are one of the best parts of Superclass:  
- **Teachers** can:
  - Start a live class with a title, chapter, and subject.
  - Record the class for students who missed it. 
  - Share their screen to explain concepts better.
- **Students** can:
  - Join the live class.
  - Send questions or chat with the teacher.
  
After the session, the recorded videos are saved for students to revisit later.

---

### 5. **Videos for Learning**  
The platform is organized so students can learn easily:
- **Videos for Every Subject**: Physics, Chemistry, Math, and Biology.
- **Safe Access**: Videos are private and hosted securely using Vimeo. They can only be viewed on Superclass and not downloaded or shared elsewhere.
- **Easy Navigation**: Videos are sorted by subjects and chapters so students can find what they need without hassle.

---

### 6. **Payments (Razorpay)**  
Students can pay for courses or subscriptions directly on Superclass:
- When a student pays, a unique payment ID is created for that transaction.
- Once the payment is confirmed:
  - The student gets access to premium content or live sessions.
  - The payment status is saved in their account for reference.

---
Here’s the detailed documentation for all the APIs in your folder structure, including the actual API structure (routes/endpoints), and a brief description of how they work:

---

### **APIs in Your App**

#### **1. `auth/`**
- **Endpoint:** `/api/auth/[...nextauth]`
- **Purpose:** Handles user authentication using NextAuth.
- **Key Functions:**
  - Implements Google OAuth 2.0 for secure login.
  - Manages user sessions and token handling with JWT.
  - Provides secure callback flow to authenticate and redirect users.

---

#### **2. `createorder/`**
- **Endpoint:** `/api/createorder`
- **Purpose:** Creates a new payment order for Razorpay.
- **Key Functions:**
  - Sends a request to Razorpay's API to generate a unique order ID.
  - Includes details like `amount`, `currency`, and `receipt ID`.
  - Returns the generated order ID to the frontend for payment processing.

---

#### **3. `fetchVideos/`**
- **Endpoint:** `/api/fetchVideos`
- **Purpose:** Fetches videos from Vimeo or YouTube.
- **Key Functions:**
  - Accepts subject or chapter as query parameters.
  - Queries Vimeo API to retrieve video links and metadata.
  - Returns video details to display securely on your app.

---

#### **4. `liveclass/`**
- **Endpoint:** `/api/liveclass`
- **Purpose:** Manages live class details and sessions.
- **Key Functions:**
  - Handles requests for starting and ending live classes on Vimeo.
  - Stores live class metadata (title, subject, chapter) for later reference.
  - Ensures only teachers can access and manage this API.

---

#### **5. `paymentcallback/`**
- **Endpoint:** `/api/paymentcallback`
- **Purpose:** Verifies payment status after Razorpay's callback.
- **Key Functions:**
  - Receives the payment confirmation and signature from Razorpay.
  - Verifies the payment authenticity using the Razorpay key and secret.
  - Updates the database with payment success or failure.

---

#### **6. `payments/`**
- **Endpoint:** `/api/payments`
- **Purpose:** Initializes and processes payments.
- **Key Functions:**
  - Handles payment requests from the frontend.
  - Validates the user’s authentication and payment eligibility.
  - Ensures seamless integration with Razorpay for secure transactions.

---

#### **7. `saveuser/`**
- **Endpoint:** `/api/saveuser`
- **Purpose:** Saves or updates user information in the database.
- **Key Functions:**
  - Checks if the user exists by querying the database with their email.
  - If the user does not exist, it creates a new record.
  - Assigns roles such as `student` or `teacher` during user creation.

---

#### **8. `sitemap/`**
- **Endpoint:** `/api/sitemap`
- **Purpose:** Generates a dynamic sitemap for your app.
- **Key Functions:**
  - Lists all URLs from the app for SEO purposes.
  - Updates dynamically as new pages or routes are added to the platform.

---

#### **9. `updatePaymentStatus/`**
- **Endpoint:** `/api/updatePaymentStatus`
- **Purpose:** Updates the user’s payment status.
- **Key Functions:**
  - Accepts the user ID and payment details from the frontend.
  - Updates the `paymentStatus` field in the database for the given user.
  - Ensures accurate tracking of paid users for accessing premium content.

---

Let me know if you’d like to expand on any specific API functionality!


### 7. **How is Everything Secure?**  
Superclass is designed to protect both data and content:
- **Login Security:** Only verified users can log in with Google OAuth, ensuring safety.
- **Protected Content:** Videos and live sessions are restricted to Superclass users, so outsiders can’t access them.
- **Encrypted Data:** Sensitive information like login tokens is encrypted so hackers can’t misuse it.

---

### 8. **Simple and Organized Design**  
- **Responsive Design:** The app looks great and works well on all devices, whether it’s a phone, tablet, or computer.
- **Easy for Everyone:** Both students and teachers find it simple to navigate the platform.

---

## **What Technologies Power Superclass?**  
Here’s what makes Superclass run smoothly:
- **Frontend (What users see):** Built using Next.js for fast, modern designs.
- **Backend (What works behind the scenes):** Managed with Next.js to handle everything efficiently.
- **Database:** MongoDB stores all user details, videos, and payment information.
- **Live Classes:** Vimeo powers all live classes for high-quality, secure streaming.
- **Payments:** Razorpay handles safe and quick payments.
- **Styling:** TailwindCSS makes the app look clean and responsive.

---

## **Why is Superclass Special?**
1. **Secure Login:** No need to remember passwords; log in with Google.
2. **Organized Learning:** Videos and classes are easy to find and use.
3. **Role Management:** Teachers and students have clear, separate features.
4. **Protected Content:** Only Superclass users can view the videos or join live sessions.
5. **Interactive Classes:** Students can learn directly from teachers through live sessions and chat.

---

## **What’s Next for Superclass?**
Here’s what can be added in the future:
- **AI Recommendations:** Suggesting videos based on student progress.
- **More Languages:** Adding regional languages for better accessibility.
- **Detailed Reports:** Allowing teachers to see student activity and performance.

---
Thankyou for reading our Readme file you can explore the website on the url(https://superclasses.site)
