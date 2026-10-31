# ⚡ Next.js Frontend Quick Start Boilerplate

A premium, production-ready frontend starting point for building state-of-the-art web applications. This boilerplate is packed with essential features such as App Router layout structure, client-hydrated Redux Toolkit state, custom global toasts, TanStack Query API caching, pre-styled UI/Form attributes, and modern design systems.

---

## 🚀 Key Features

*   **Next.js 16 (Turbopack & App Router)**: Leveraging the latest features, conventions, and server-side compilation speeds of Next.js.
*   **Tailwind CSS v4 & Vanilla CSS**: Premium modern aesthetics featuring high-contrast typography, interactive hover elements, smooth transitions, and seamless dark mode support.
*   **Redux Toolkit State Management**: Complete global state setup (slices for `auth`, `modal`, `toast`) with client-side local storage hydration.
*   **TanStack React Query v5 & Axios Layer**: Scalable async data-fetching logic featuring automatic request interceptors, authorization header injection, auto-redirect on unauthorized events (`401`), and caching configurations.
*   **Interactive Forms & Verification**: Unified validation schemas powered by **Yup** and **Formik**, paired with custom validation warning prompts.
*   **Reusable Attribute Components**: A comprehensive set of premium, pre-styled inputs (buttons, checkboxes, date range pickers, phoneNumber, quill editor, radios, select tabs, switches, text fields).
*   **Global Toasts**: Trigger rich toast notifications from anywhere in the codebase (including helper files or Axios handlers) using a simple utility function.

---

## 📂 Project Structure

The project codebase is organized under the `src` directory with clear separations of concern:

```text
src/
├── api/                    # API communication layer
│   ├── methods/            # Axios HTTP handlers (Get, Post, Put, Delete)
│   ├── reactQuery/         # TanStack Query custom wrappers
│   ├── Mutations.ts        # Mutation query declarations
│   └── Queries.ts          # Fetch query declarations
├── app/                    # Next.js App Router (pages, layout, globals.css)
├── Attribute/              # Custom Form Fields and Notification UI
│   ├── FormFields/         # Pre-styled reusable inputs (TextField, Button, etc.)
│   └── Notification/       # Global toast notification component
├── components/             # Reusable UI layout elements
│   ├── common/             # Global modal, popups, and widgets
│   └── layout/             # Main layout views (Header, Footer)
├── constants/              # Global constants (apiUrls, storageKeys, statusCodes)
├── providers/              # React Context / Global Provider wrappers
├── schemas/                # Formik and Yup validation schemas
├── store/                  # Redux Toolkit setup, slices, and custom hooks
├── types/                  # Shared TypeScript type definitions
└── utils/                  # Utility helper functions (Common functions, Toast dispatchers)
```

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have **Node.js (v18.x or later)** and **npm** (or yarn/pnpm) installed.

### 2. Installation
Clone the repository and install the project dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory (based on your target API environment):
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 4. Running the Development Server
Run the development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the application.

### 5. Production Build & Linting
Validate type-correctness, run ESLint checks, and package the optimized application:
```bash
# Run linting checks
npm run lint

# Generate production build
npm run build

# Start production server
npm run start
```

---

## 📖 Component & Feature Guides

### 1. Toast Notification System
You can trigger dynamic toast notifications from **anywhere** in your code (even outside React components, e.g., inside an Axios interceptor or utility function):

```typescript
import { setToast } from "@/utils";

// Trigger a success toast
setToast({
  message: "Profile updated successfully!",
  type: "success",
});

// Trigger an error toast
setToast({
  message: "Session expired. Please sign in again.",
  type: "error",
});
```

### 2. State Management with Redux Toolkit
Access state or dispatch actions using the custom type-safe hooks `useAppSelector` and `useAppDispatch`:

```tsx
import { useAppSelector, useAppDispatch } from "@/store";
import { setModalOpen } from "@/store/slices/modalSlice";
import { CommonButton } from "@/Attribute";

export default function ModalToggle() {
  const dispatch = useAppDispatch();
  const { isModalOpen } = useAppSelector((state) => state.modal);

  return (
    <CommonButton onClick={() => dispatch(setModalOpen({ open: true }))}>
      Open Redux Modal ({isModalOpen.open ? "Open" : "Closed"})
    </CommonButton>
  );
}
```

### 3. Form Validation with Formik & Yup
Easily integrate schema-validated forms using the provided attribute components:

```tsx
import { useFormik } from "formik";
import { loginSchema } from "@/schemas";
import { CommonTextField, CommonButton } from "@/Attribute";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Submit:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <CommonTextField
        label="Email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email ? formik.errors.email : undefined}
      />
      <CommonTextField
        label="Password"
        type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password ? formik.errors.password : undefined}
      />
      <CommonButton type="submit" isLoading={formik.isSubmitting}>
        Sign In
      </CommonButton>
    </form>
  );
}
```

### 4. API Integration (TanStack Query & Axios)
Add queries to `src/api/Queries.ts` and mutations to `src/api/Mutations.ts` for clean data-fetching code:

```typescript
// src/api/Queries.ts
import { Get } from "./methods";
import { useQueries } from "./reactQuery";
import { API_URLS, QUERY_KEYS } from "@/constants";

export const Queries = {
  useCurrentUser: () =>
    useQueries<{ name: string; email: string }>([QUERY_KEYS.ME], () =>
      Get(API_URLS.ME)
    ),
};
```

And query the data in your component:
```tsx
import { Queries } from "@/api";

export default function UserProfile() {
  const { data, isLoading, isError } = Queries.useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load profile.</div>;

  return <div>Welcome back, {data?.name}!</div>;
}
```

---

## 💡 Design System & Customization

The project uses **Tailwind CSS v4** with CSS variables for colors, typography, and spacing configured in `src/app/globals.css`. 

*   **Colors**: Neutral zinc-based light/dark theme color tokens are declared in the root layer.
*   **Typography**: Fully styled with Geist Sans and Geist Mono typography variables optimized for high legibility.
*   **Animations**: Built-in micro-animations for button scales, toast entry/exit transitions, and loading spinners.
