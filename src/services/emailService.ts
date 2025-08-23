import { Resend } from 'resend'
import { palette } from '../utils/palette'

const resend = new Resend(process.env.RESEND_KEY)

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

const dashboardUrl = `${process.env.FRONTEND_URL || 'https://app.mon-journal-ief.com'}/`

class EmailService {
  private defaultFrom = 'Guillaume de Mon Journal IEF <guillaume@mon-journal-ief.com>'

  private getEmailHeader(title: string) {
    return `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: ${palette.gray[800]};
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: ${palette.primary[50]};
          }
          .container {
            background-color: ${palette.primary[50]};
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 6px rgba(55, 50, 42, 0.1);
            border: 1px solid ${palette.slate[200]};
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: ${palette.primary[400]};
            margin-bottom: 10px;
          }
          .title {
            font-size: 20px;
            font-weight: 600;
            color: ${palette.gray[800]};
            margin-bottom: 10px;
          }
          .subtitle {
            color: ${palette.slate[600]};
            margin-bottom: 30px;
          }
          .button {
            display: inline-block;
            background-color: ${palette.primary[400]};
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            margin: 20px 0;
          }
          .button:hover {
            background-color: ${palette.primary[500]};
          }
          .features {
            background-color: ${palette.green[50]};
            border: 1px solid ${palette.green[500]};
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .feature {
            margin: 10px 0;
            display: flex;
            align-items: flex-start;
          }
          .feature-icon {
            color: ${palette.green[500]};
            margin-right: 10px;
            margin-top: 2px;
          }
          .subscription-details {
            background-color: ${palette.green[50]};
            border: 1px solid ${palette.green[500]};
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid ${palette.gray[200]};
            font-size: 14px;
            color: ${palette.slate[600]};
            text-align: center;
          }
          .warning {
            background-color: ${palette.primary[100]};
            border: 1px solid ${palette.primary[300]};
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: ${palette.primary[800]};
          }
          .link-color {
            color: ${palette.slate[600]};
          }
        </style>
      </head>
      <body>
        <div class="container">
    `
  }

  private getEmailFooter() {
    return `
      <div class="footer">
        <p>Cet email a été envoyé par <a href="https://www.mon-journal-ief.com">Mon Journal IEF</a></p>
        <p>Si vous avez la moindre question, n'hésitez pas à répondre ici, je réponds à tous mes mails !</p>
        <br>
        <p>Guillaume de Mon Journal IEF</p>
      </div>
        </div>
      </body>
      </html>
    `
  }

  async sendEmail({ to, subject, html, from }: EmailOptions) {
    try {
      const { data, error } = await resend.emails.send({
        from: from || this.defaultFrom,
        to: [to],
        subject,
        html,
      })

      if (error) {
        console.error('Email sending error:', error)
        throw new Error(`Failed to send email: ${error.message}`)
      }

      console.log('Email sent successfully:', data)
      return data
    } catch (error) {
      console.error('Email service error:', error)
      throw error
    }
  }

  async sendPasswordResetEmail(to: string, name: string, resetToken: string) {
    const resetUrl = `${dashboardUrl}reinitialisation?token=${resetToken}`
    
    const html = `
      ${this.getEmailHeader('Réinitialisation de votre mot de passe')}
          <div class="header">
            <div class="logo">Mon Journal IEF</div>
            <h1 class="title">Réinitialisation de votre mot de passe</h1>
            <p class="subtitle">Bonjour ${name},</p>
          </div>

          <p>Vous avez demandé à réinitialiser votre mot de passe pour votre compte Mon Journal IEF.</p>
          
          <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>

          <div style="text-align: center;">
            <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
          </div>

          <div class="warning">
            <strong>⚠️ Important :</strong> Ce lien est valide pendant 1 heure uniquement. Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email en toute sécurité.
          </div>

          <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: ${palette.slate[600]}; font-size: 14px;">${resetUrl}</p>

          ${this.getEmailFooter()}
    `

    return this.sendEmail({
      to,
      subject: 'Réinitialisation de votre mot de passe - Mon Journal IEF',
      html,
    })
  }

  async sendEmailVerification(to: string, name: string, verificationToken: string) {
    const verificationUrl = `${dashboardUrl}verification?token=${verificationToken}`
    
    const html = `
      ${this.getEmailHeader('Vérifiez votre adresse email')}
          <div class="header">
            <div class="logo">Mon Journal IEF</div>
            <h1 class="title">Vérifiez votre adresse email</h1>
            <p class="subtitle">Bonjour ${name},</p>
          </div>

          <p>Merci de vous être inscrit sur Mon Journal IEF ! Pour finaliser la création de votre compte, nous devons vérifier votre adresse email.</p>
          
          <p>Cliquez sur le bouton ci-dessous pour confirmer votre adresse email :</p>

          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">Vérifier mon email</a>
          </div>

          <div class="warning">
            <strong>⚠️ Important :</strong> Ce lien est valide pendant 24 heures. Si vous n'avez pas créé de compte sur Mon Journal IEF, vous pouvez ignorer cet email en toute sécurité.
          </div>

          <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: ${palette.slate[600]}; font-size: 14px;">${verificationUrl}</p>

          <p>Une fois votre email vérifié, vous pourrez accéder à toutes les fonctionnalités de Mon Journal IEF et créer le journal de suivi de vos enfants.</p>

          ${this.getEmailFooter()}
    `

    return this.sendEmail({
      to,
      subject: 'Vérifiez votre adresse email - Mon Journal IEF',
      html,
    })
  }

  async sendSubConfirmationStandard(to: string, name: string) {
    const html = `
      ${this.getEmailHeader('Bienvenue sur Mon Journal IEF !')}
          <div class="header">
            <div class="logo">Mon Journal IEF</div>
            <h1 class="title">Bienvenue sur Mon Journal IEF ! 🎉</h1>
            <p class="subtitle">Bonjour ${name},</p>
          </div>

          <p>Félicitations ! Votre abonnement est désormais actif.</p>
          
          <p>Merci beaucoup pour votre soutien. N'hésitez pas à me contacter pour toute question ou suggestion.</p>

          <div style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Accéder à mon tableau de bord</a>
          </div>

          ${this.getEmailFooter()}
    `

    return this.sendEmail({
      to,
      subject: 'Bienvenue sur Mon Journal IEF ! 🎉',
      html,
    })
  }

  async sendWelcomeStandard(to: string, name: string) {
    const html = `
      ${this.getEmailHeader('Bienvenue sur Mon Journal IEF !')}
          <div class="header">
            <div class="logo">Mon Journal IEF</div>
            <h1 class="title">Bienvenue sur Mon Journal IEF ! 🎉</h1>
            <p class="subtitle">Bonjour ${name},</p>
          </div>

          <p>Bienvenue dans la communauté Mon Journal IEF ! Votre compte a été créé avec succès.</p>
          
          <p>Vous pouvez maintenant commencer à créer le journal de suivi de vos enfants et profiter de toutes les fonctionnalités de la plateforme.</p>

          <div style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Accéder à mon journal</a>
          </div>

          ${this.getEmailFooter()}
    `

    return this.sendEmail({
      to,
      subject: 'Bienvenue sur Mon Journal IEF ! 🎉',
      html,
    })
  }

  async sendWelcomeSolidarity(to: string, name: string) {
    const html = `
      ${this.getEmailHeader('Bienvenue sur Mon Journal IEF ! 🎉')}
          <div class="header">
            <div class="logo">Mon Journal IEF</div>
            <h1 class="title">Bienvenue sur Mon Journal IEF ! 🎉</h1>
            <p class="subtitle">Bonjour ${name},</p>
          </div>

          <p>Félicitations ! Votre <strong>accès solidaire gratuit</strong> a été activé avec succès.</p>
          <p>L'accès solidaire est entièrement gratuit, sans conditions. Si un jour votre situation s'améliore et que vous souhaitez soutenir le développement de Mon Journal IEF, ce sera formidable ! Mais aucune pression - l'important est que vous puissiez accompagner sereinement l'instruction de vos enfants. 😊</p>

          <div style="text-align: center;">
            <a href="${dashboardUrl}" class="button">Accéder à mon journal</a>
          </div>

          ${this.getEmailFooter()}
    `

    return this.sendEmail({
      to,
      subject: 'Bienvenue sur Mon Journal IEF ! 🎉 (Accès solidaire)',
      html,
    })
  }
}

export default new EmailService()
