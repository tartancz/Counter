from allauth.account.adapter import DefaultAccountAdapter

from django.conf import settings


class AccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        """
        same as original except current site is rewritten to return frontend url
        """
        frontend = getattr(settings, "FRONTEND_VERIFY_URL", None)
        current_site = {"name": frontend, "domain": frontend}
        activate_url = self.get_email_confirmation_url(request, emailconfirmation)
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": current_site,
            "key": emailconfirmation.key,
        }
        if signup:
            email_template = "account/email/email_confirmation_signup"
        else:
            email_template = "account/email/email_confirmation"
        self.send_mail(email_template, emailconfirmation.email_address.email, ctx)

    def get_email_confirmation_url(self, request, emailconfirmation):
        """
        return url of frontend in email
        """
        frontend = getattr(settings, "FRONTEND_VERIFY_URL", None)
        return f"https://{frontend}/email/{emailconfirmation.key}"
