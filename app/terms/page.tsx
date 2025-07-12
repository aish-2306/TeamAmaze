import Link from "next/link"
import { FileText, Users, AlertTriangle, Scale } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                <FileText className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Terms of Service</h1>
              </div>
              <p className="text-xl text-muted-foreground">Last updated: January 2024</p>
            </div>

            <div className="space-y-8">
              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    By accessing and using StackIt, you accept and agree to be bound by the terms and provision of this
                    agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">User Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Creation</h4>
                    <p className="text-muted-foreground">
                      You must provide accurate and complete information when creating an account. You are responsible
                      for maintaining the security of your account credentials.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Account Responsibility</h4>
                    <p className="text-muted-foreground">
                      You are responsible for all activities that occur under your account. You must notify us
                      immediately of any unauthorized use of your account.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Content Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">User Content</h4>
                    <p className="text-muted-foreground">
                      You retain ownership of content you post, but grant StackIt a license to use, modify, and
                      distribute your content as part of the service.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prohibited Content</h4>
                    <ul className="space-y-1 text-muted-foreground list-disc pl-5">
                      <li>Spam, harassment, or abusive content</li>
                      <li>Illegal or harmful content</li>
                      <li>Content that violates intellectual property rights</li>
                      <li>Misleading or false information</li>
                      <li>Content that violates privacy of others</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <AlertTriangle className="h-5 w-5" />
                    Prohibited Uses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    <li>Using the service for any unlawful purpose</li>
                    <li>Attempting to gain unauthorized access to the service</li>
                    <li>Interfering with or disrupting the service</li>
                    <li>Creating multiple accounts to circumvent restrictions</li>
                    <li>Using automated tools to access the service without permission</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Scale className="h-5 w-5" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    StackIt is provided "as is" without any warranties. We are not liable for any damages arising from
                    your use of the service. Our liability is limited to the maximum extent permitted by law.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We may terminate or suspend your account at any time for violations of these terms. You may also
                    terminate your account at any time by contacting us.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about these Terms of Service, please contact us at legal@stackit.com
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-4 md:py-6 bg-background border-border">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8 px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 StackIt. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              About
            </Link>
            <Link href="/privacy" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
