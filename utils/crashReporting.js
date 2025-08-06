// Simple crash reporting utility
// In production, replace this with Sentry or Firebase Crashlytics

class CrashReporter {
  constructor() {
    this.isEnabled = __DEV__ ? false : true; // Only enable in production
  }

  // Log errors
  logError(error, context = {}) {
    if (!this.isEnabled) {
      console.error('CrashReporter - Error:', error, context);
      return;
    }

    // In production, this would send to your crash reporting service
    // Example with Sentry:
    // Sentry.captureException(error, {
    //   extra: context,
    // });

    // Example with Firebase Crashlytics:
    // crashlytics().recordError(error);

    console.error('Production Error:', error, context);
  }

  // Log non-fatal errors
  logWarning(message, context = {}) {
    if (!this.isEnabled) {
      console.warn('CrashReporter - Warning:', message, context);
      return;
    }

    // In production, this would send to your crash reporting service
    console.warn('Production Warning:', message, context);
  }

  // Set user context
  setUser(user) {
    if (!this.isEnabled) return;

    // Example with Sentry:
    // Sentry.setUser({
    //   id: user.id,
    //   email: user.email,
    //   username: user.name,
    // });

    console.log('CrashReporter - User set:', user);
  }

  // Add breadcrumb for debugging
  addBreadcrumb(message, category = 'general', data = {}) {
    if (!this.isEnabled) return;

    // Example with Sentry:
    // Sentry.addBreadcrumb({
    //   message,
    //   category,
    //   data,
    //   level: 'info',
    // });

    console.log('CrashReporter - Breadcrumb:', { message, category, data });
  }

  // Enable/disable crash reporting
  setEnabled(enabled) {
    this.isEnabled = enabled;
  }
}

// Create singleton instance
const crashReporter = new CrashReporter();

export default crashReporter; 