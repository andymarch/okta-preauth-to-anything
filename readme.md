# Okta PreAuth to Anything

Preauth to anything provides a service accessable to the Okta sign in widget to
allow for the migration of users with currently unsupported authentication
sources.

## Migration process

- Import users from the existing system to Okta and assign to a group which
  designates that they require migration. Users should be set as activated with
  a random password.

- Update the validateCredentials method in ```routes/migrate.js``` with your
  implementation for authn against the existing source of truth for the user's
  password.
  
- Deploy the preauth-to-anything service publically with the following
  configuration set.

  ```
    TENANT=<you Okta tenant>
    TOKEN=<an Okta API token scoped to cover all users in the migration group>
    MIGRATION_GROUP_ID=<the Okta id for the migration group>
    CORS_WHITELIST=<space seperated list of any domains from which this service 
    will be called.
  ```

- Update your customized Okta sign-in page with the content of
  ```custom-sign-in.html``` or add the processCreds method to the configuration
  of your own self hosted widget. Update the values for ```<yourendpoint>``` to
  point at your deployed instance of preauth-to-anything.