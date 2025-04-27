# Real-World Cherry-Pick Scenarios

This document provides practical scenarios where cherry-picking is valuable in real-world development workflows.

## Scenario 1: Backporting Critical Bug Fixes

**Situation:**
- Your team maintains both the current release (v2.0) and a legacy version (v1.5)
- A critical security vulnerability is discovered and fixed in the current release branch
- The fix needs to be applied to the legacy version as well

**Before Cherry-Pick:**
```
main (v2.0)      A---B---C---D---E (fix)
                /
legacy (v1.5)  F---G---H
```

**After Cherry-Pick:**
```
main (v2.0)      A---B---C---D---E (fix)
                /
legacy (v1.5)  F---G---H---E' (cherry-picked fix)
```

**Why Cherry-Pick Works Here:**
- The security fix is isolated and doesn't depend on newer features
- Creating a separate fix for legacy would risk inconsistency
- Full merge from main would bring unwanted features into legacy

## Scenario 2: Selectively Integrating Features

**Situation:**
- Your team is working on multiple features in parallel
- Feature A is ready for release, but Features B and C need more testing
- All features are being developed in the same branch

**Before Cherry-Pick:**
```
main          M---N---O
              /
feature     P---A---B---C
                |   |   |
              feat A feat B feat C
```

**After Cherry-Pick:**
```
main          M---N---O---A' (cherry-picked)
              /
feature     P---A---B---C
                |   |   |
              feat A feat B feat C
```

**Why Cherry-Pick Works Here:**
- Feature A can be released independently
- Features B and C can continue development without affecting production
- Clean history is maintained on main

## Scenario 3: Salvaging Work from Abandoned Feature

**Situation:**
- A feature branch contains several utility functions that are valuable
- The main feature itself was decided against implementing
- You want to keep some of the utility work without the feature

**Before Cherry-Pick:**
```
main              X---Y---Z
                 /
abandoned-feature X---U---V---W
                      |   |   |
                   utils feature more feature
```

**After Cherry-Pick:**
```
main              X---Y---Z---U' (cherry-picked utils)
                 /
abandoned-feature X---U---V---W
                      |   |   |
                   utils feature more feature
```

**Why Cherry-Pick Works Here:**
- Salvages valuable utility functions
- Avoids merging unwanted feature code
- Preserves development history

## Scenario 4: Hotfix Across Multiple Branches

**Situation:**
- You maintain three active release branches (v3.0, v2.5, and v2.0)
- A critical bug is discovered affecting all versions
- The fix needs to be applied to all active releases

**Before Cherry-Pick:**
```
v3.0    A---B---C
       /
v2.5   D---E---F
      /
v2.0  G---H---I
```

**After Fix and Cherry-Pick:**
```
v3.0    A---B---C---J (fix)
       /
v2.5   D---E---F---J' (cherry-picked)
      /
v2.0  G---H---I---J" (cherry-picked)
```

**Why Cherry-Pick Works Here:**
- The same fix applies to all branches
- Each branch maintains its independent history
- Changes are minimal and focused

## Best Practices Based on These Scenarios

1. **Write atomic commits** that focus on a single logical change
2. **Use clear, descriptive commit messages** that explain what and why
3. **Create separate branches for features** to make cherry-picking easier
4. **Document cherry-picked commits** in your team's knowledge base
5. **Test thoroughly after cherry-picking** to ensure functionality in the new context

## When Not to Cherry-Pick

While cherry-picking is powerful, it's not always the right approach:

1. **When changes are tightly coupled** with other commits
2. **For large-scale refactoring** that touches multiple systems
3. **When commit history is important** to understand the evolution of code
4. **When your team doesn't have a clear process** for tracking cherry-picked commits

In these cases, traditional merging, rebasing, or feature branching strategies might be more appropriate.
