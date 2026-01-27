
# Fix: Media Manager Page Not Loading

## Problem Identified

The `/admin/media` page shows an infinite loading spinner because the component doesn't properly handle the authentication loading state.

**Root Cause (line 328-333 in MediaManager.tsx):**
```javascript
if (!user) {
  return <Loader2 ... />  // Shows forever!
}
```

The component checks if `user` is null, but doesn't check if authentication is still loading (`isLoading` from AuthContext). When the page loads:
1. Auth is initializing → `isLoading: true`, `user: null`
2. Component sees `!user` → shows spinner
3. Auth finishes → but component already rendered the loading state and never rechecks

## Solution

Update the MediaManager component to:
1. Import and use `isLoading` from the AuthContext
2. Show loading spinner only while auth is initializing
3. Redirect to login page if auth finished and user is not logged in

## Technical Changes

### File: `src/pages/admin/MediaManager.tsx`

**Change 1: Update useAuth hook usage (line 64)**
```typescript
// Before
const { user, signOut } = useAuth();

// After  
const { user, isLoading: authLoading, signOut } = useAuth();
```

**Change 2: Fix the auth check logic (lines 328-334)**
```typescript
// Before
if (!user) {
  return (
    <div className="flex min-h-screen items-center justify-center ...">
      <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
    </div>
  );
}

// After
if (authLoading) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-soft-linen via-pure-white to-light-cloud">
      <Loader2 className="h-8 w-8 animate-spin text-warm-stone" />
    </div>
  );
}

if (!user) {
  navigate("/login");
  return null;
}
```

**Change 3: Update useEffect dependencies (line 129)**
```typescript
// Before
useEffect(() => {
  if (user) {
    fetchFiles();
  }
}, [user, fetchFiles]);

// After
useEffect(() => {
  if (user && !authLoading) {
    fetchFiles();
  }
}, [user, authLoading, fetchFiles]);
```

## Expected Behavior After Fix

| Scenario | Before | After |
|----------|--------|-------|
| Auth loading | Infinite spinner | Shows spinner briefly |
| User logged in | Infinite spinner | Shows media manager |
| User not logged in | Infinite spinner | Redirects to /login |

## Files to Modify
- `src/pages/admin/MediaManager.tsx` - Add proper auth loading state handling
