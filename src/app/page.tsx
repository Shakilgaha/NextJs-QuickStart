"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { Modal } from "@/components/common";
import { CommonButton, CommonTextField } from "@/Attribute";
import { useAppSelector, useAppDispatch } from "@/store";
import { setModalOpen } from "@/store/slices/modalSlice";
import { setToast } from "@/utils";
import { loginSchema } from "@/schemas";
import { Queries } from "@/api";

export default function Home() {
  const dispatch = useAppDispatch();

  // Redux States
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { isModalOpen } = useAppSelector((state) => state.modal);

  // Local state for local interactions (e.g. counter)
  const [count, setCount] = useState(0);

  // React Query Fetch
  const { isLoading: isQueryLoading } = Queries.useCurrentUser();

  // Form State & Validation with Formik + Yup
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        setToast({
          message: "Form validated successfully with Formik + Yup!",
          type: "success",
        });
      }, 600);
    },
  });

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form fields manually to trigger error toast
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        email: true,
        password: true,
      });
      setToast({ message: "Please correct the form errors.", type: "error" });
    } else {
      formik.handleSubmit(e);
    }
  };

  return (
    <main className="max-w-7xl w-full mx-auto px-6 sm:px-8 py-12">
      {/* Banner */}
      <section className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-900 border border-zinc-800">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 mb-4 select-none">
            Quick Start Boilerplate
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Next.js Frontend Quick Start
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            A premium, production-ready frontend starting point. Packaged with
            SSR-safe Redux state, custom global toasts, TanStack query caching,
            and pre-styled UI components.
          </p>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Redux & Global State */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Redux State Management
              </h2>
            </div>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Demonstrates store synchronization, dispatch actions, and modal
              toggles. The modal below is controlled directly via the global
              Redux state slice.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-55 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Auth Status:
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isAuthenticated ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-955 dark:text-emerald-300" : "bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-450"}`}
              >
                {isAuthenticated
                  ? `Signed in as ${user?.name}`
                  : "Not Signed In"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <CommonButton
                variant="outline"
                size="sm"
                onClick={() => dispatch(setModalOpen({ open: true }))}
              >
                Open Redux Modal
              </CommonButton>
              <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1">
                <CommonButton
                  variant="secondary"
                  size="sm"
                  className="px-2.5 py-1"
                  onClick={() => setCount(count - 1)}
                >
                  -
                </CommonButton>
                <span className="w-10 text-center font-bold text-sm text-zinc-800 dark:text-zinc-200">
                  {count}
                </span>
                <CommonButton
                  variant="secondary"
                  size="sm"
                  className="px-2.5 py-1"
                  onClick={() => setCount(count + 1)}
                >
                  +
                </CommonButton>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Custom Global Toasts */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Custom Global Toast System
              </h2>
            </div>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Trigger dynamic notifications from anywhere. Since it dispatches
              directly to the store via standard JS, you can call it inside
              Axios API files, utility helpers, or custom React hooks.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <CommonButton
              variant="primary"
              size="sm"
              onClick={() =>
                setToast({
                  message: "Action successfully processed!",
                  type: "success",
                })
              }
            >
              Success Toast
            </CommonButton>
            <CommonButton
              variant="danger"
              size="sm"
              onClick={() =>
                setToast({
                  message: "An unexpected error occurred.",
                  type: "error",
                })
              }
            >
              Error Toast
            </CommonButton>
            <CommonButton
              variant="secondary"
              size="sm"
              onClick={() =>
                setToast({
                  message: "Here is some helpful information.",
                  type: "info",
                })
              }
            >
              Info Toast
            </CommonButton>
          </div>
        </div>

        {/* Card 3: Formik + Yup Form Validation */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Form Validation with Formik + Yup
              </h2>
            </div>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Validates inputs using a pre-configured schema. Try typing an
              invalid email or short password to see real-time boundary
              validation.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <CommonTextField
              label="Email Address"
              placeholder="developer@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email ? formik.errors.email : undefined}
            />
            <CommonTextField
              label="Password"
              type="password"
              placeholder="******"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password ? formik.errors.password : undefined
              }
            />
            <CommonButton
              type="submit"
              size="sm"
              className="w-full"
              isLoading={formik.isSubmitting}
            >
              Validate Form
            </CommonButton>
          </form>
        </div>

        {/* Card 4: React Query API Fetching */}
        <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                React Query & API Layer
              </h2>
            </div>
            <p className="text-zinc-655 dark:text-zinc-400 text-sm leading-relaxed mb-6">
              Demonstrates asynchronous API caching. The fetch below targets
              `/api/auth/me` which returns a simulated catch response,
              showcasing error recovery and mock fallback rendering.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 min-h-[120px] flex flex-col justify-center">
              {isQueryLoading ? (
                <div className="flex items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm">
                  <svg
                    className="animate-spin h-5 w-5 text-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Fetching user data from profile API...</span>
                </div>
              ) : (
                <div className="text-xs space-y-2">
                  <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-1 text-zinc-500">
                    <span>Fetch Status:</span>
                    <span className="text-red-500 font-semibold uppercase">
                      API 404 Error (Intercepted)
                    </span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed">
                    Axios safely threw an error and triggered a global Toast.
                    Showing default fallback UI state:
                  </p>
                  <div className="p-3 rounded bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                    <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                      John Doe (Fallback Profile)
                    </p>
                    <p className="text-[10px] text-zinc-550 mt-0.5">
                      Email: john.doe@nextquickstart.com
                    </p>
                    <p className="text-[10px] text-zinc-550 mt-0.5">
                      Role: Administrator
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Redux State controlled Modal */}
      <Modal
        title="Redux State Showcase Modal"
        isOpen={isModalOpen.open}
        onClose={() => dispatch(setModalOpen({ open: false }))}
      >
        <div className="space-y-4">
          <p className="text-sm text-zinc-600 dark:text-zinc-350 leading-relaxed">
            This modal is fully controlled by the Redux store! Calling{" "}
            <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded text-xs">
              dispatch(setModalOpen(&#123; open: false &#125;))
            </code>{" "}
            from any file resets the state and closes this viewport
            automatically.
          </p>
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-xs">
            <p className="font-semibold mb-1">State Tree Info:</p>
            <pre className="font-mono text-zinc-500">
              {JSON.stringify({ modal: isModalOpen, count }, null, 2)}
            </pre>
          </div>
          <div className="flex justify-end">
            <CommonButton
              size="sm"
              onClick={() => dispatch(setModalOpen({ open: false }))}
            >
              Close Modal
            </CommonButton>
          </div>
        </div>
      </Modal>
    </main>
  );
}
