import Link from "next/link"
import { Shield, Eye, Lock, UserCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4 text-primary">
                <Shield className="h-8 w-8" />
                <h1 className="text-4xl font-bold">Privacy Policy</h1>
              </div>
              <p className="text-xl text-muted-foreground">Last updated: January 2024</p>
            </div>

            <div className="space-y-8">
              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Eye className="h-5 w-5" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Account Information</h4>
                    <p className="text-muted-foreground">
                      When you create an account, we collect your email address, username, and any profile information
                      you choose to provide.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Content</h4>
                    <p className="text-muted-foreground">
                      We collect the questions, answers, comments, and other content you post on StackIt.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Usage Data</h4>
                    <p className="text-muted-foreground">
                      We collect information about how you use our service, including pages visited, features used, and
                      interaction patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Lock className="h-5 w-5" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    <li>To provide and maintain our service</li>
                    <li>To notify you about changes to our service</li>
                    <li>To allow you to participate in interactive features</li>
                    <li>To provide customer support</li>
                    <li>To gather analysis or valuable information to improve our service</li>
                    <li>To monitor the usage of our service</li>
                    <li>To detect, prevent and address technical issues</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <UserCheck className="h-5 w-5" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Access and Update</h4>
                    <p className="text-muted-foreground">
                      You can access and update your account information at any time through your profile settings.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Portability</h4>
                    <p className="text-muted-foreground">
                      You have the right to request a copy of your personal data in a structured, machine-readable
                      format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Deletion</h4>
                    <p className="text-muted-foreground">
                      You can request deletion of your account and associated data. Some content may remain visible if
                      it's essential to the community.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We implement appropriate security measures to protect your personal information against unauthorized
                    access, alteration, disclosure, or destruction. However, no method of transmission over the Internet
                    or electronic storage is 100% secure.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at privacy@stackit.com
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
