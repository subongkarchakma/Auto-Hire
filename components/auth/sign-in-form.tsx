"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeSlash } from "@gravity-ui/icons"
import { InputGroup, Label, TextField } from "@heroui/react"
import { AlertTriangleIcon } from "lucide-react"
import { toast } from "sonner"

import { ButtonLink } from "@/components/shared/button-link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient, signIn } from "@/lib/auth-client"

type SignInFormProps = {
  /** Validated same-site path to return to after a successful sign-in. */
  nextPath: string
  /** True when the server could not verify a session (auth/database down). */
  authUnavailable: boolean
}

export function SignInForm({ nextPath, authUnavailable }: SignInFormProps) {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleEmailLogin(event: React.SubmitEvent<HTMLElement>) {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const formData = new FormData(event.target as HTMLFormElement)
    const credentials = Object.fromEntries(formData.entries()) as {
      email: string
      password: string
    }

    const { data, error } = await authClient.signIn.email(credentials)

    if (data) {
      toast.success("Signed in")
      router.replace(nextPath)
      router.refresh()
      return
    }

    setIsSubmitting(false)
    toast.error("Could not sign in", {
      description:
        error?.message ?? "Check your email and password and try again.",
    })
  }

  async function handleGoogleLogIn() {
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL: nextPath,
      })

      if (error) {
        toast.error("Google sign-in is unavailable", {
          description:
            error.message ?? "The Google provider is not configured yet.",
        })
      }
    } catch {
      toast.error("Google sign-in is unavailable", {
        description: "The Google provider is not configured yet.",
      })
    }
  }

  return (
    <div className="mx-auto my-8 flex max-w-3xl flex-col gap-6 px-4">
      {authUnavailable ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
        >
          <AlertTriangleIcon
            aria-hidden
            className="mt-0.5 size-4 shrink-0 text-destructive"
          />
          <div className="text-sm">
            <p className="font-medium text-destructive">
              We couldn&apos;t verify your session
            </p>
            <p className="mt-1 text-muted-foreground">
              The authentication service is unreachable, so vehicle details stay
              locked. Please try again shortly.
            </p>
            <ButtonLink
              href={nextPath}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Try again
            </ButtonLink>
          </div>
        </div>
      ) : null}

      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to view vehicle details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>

              <TextField className="w-full" name="password">
                <Label>Password</Label>
                <InputGroup>
                  <InputGroup.Input
                    className="w-full"
                    type={isVisible ? "text" : "password"}
                  />
                  <InputGroup.Suffix className="pe-0">
                    <Button
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeSlash className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Signing in…" : "Log in"}
                </Button>

                <div className="py-5">
                  <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                    Or continue with
                  </FieldSeparator>
                </div>
                <Field>
                  <Button
                    onClick={handleGoogleLogIn}
                    variant="outline"
                    type="button"
                  >
                    <svg
                      className="font-bold text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </Button>
                </Field>

                <FieldDescription className="text-center">
                  Don&apos;t Have an account?{" "}
                  <Link href="/sign-up">Register</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
