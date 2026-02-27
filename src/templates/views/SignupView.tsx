// SignupView.tsx
import { getViewPath } from "$routers/website/utils"
import SignupForm from "$templates/components/auth/SignupForm"
import Icon from "$templates/components/Icon"

export const signupViewContainerId = "signup-view-container"

const SignupView = () => {
  const values = {
    email: "",
    firstName: "",
    lastName: ""
  }

  const initialValues = { ...values }

  return (
    <div class="container h-full flex items-center justify-center">
      <div class="flex flex-col gap-y-6 justify-center w-full max-w-[420px] px-4" id={signupViewContainerId}>
        {/* Header */}
        <div class="flex flex-col gap-y-4">
          <a
            href={getViewPath("public", "HOME")}
            hx-boost="true"
            class="flex items-center gap-x-2 text-gray-400 hover:text-gray-300 transition-colors w-fit"
          >
            <Icon name="chevron-left" size={18} />
            <span class="text-sm">Back</span>
          </a>
          
          <div class="flex flex-col gap-y-2">
            <h1 class="text-3xl font-roboto-bold text-white">Create Account</h1>
            <p class="text-sm text-gray-400">
              Get started with your free account
            </p>
          </div>
        </div>

        {/* Form */}
        <SignupForm
          values={values}
          initialValues={initialValues}
        />
      </div>
    </div>
  )
}

export default SignupView