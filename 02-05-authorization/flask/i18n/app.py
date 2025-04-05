from flask import Flask, request, jsonify

from translations import TRANSLATIONS

# Create a Flask application instance
app = Flask(__name__)

# Function to determine which language to use
def get_locale():
    lang = request.args.get('lang')
    if lang in TRANSLATIONS:
        return lang
    # Default to English
    return 'en'

# Helper function to translate text
def gettext(key):
    locale = get_locale()
    return TRANSLATIONS.get(locale, {}).get(key, TRANSLATIONS['en'].get(key, key))


# Define a route for the root URL
@app.route('/')
def getRestricted():
  # Just pretend this is your highly-secure application
  if "allowed" != "allowed":
    return { "account": "this is your account" }

  return { "message": gettext('restricted') }

# Run the application if this file is executed directly
if __name__ == '__main__':
    # Run the app in debug mode for development
    app.run(debug=True)
