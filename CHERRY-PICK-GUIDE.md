# Practical Cherry-Picking Guide

This guide demonstrates how to cherry-pick specific commits from one branch to another.

## Our Scenario

In our repository, we have:
- `main` branch: The production branch
- `feature-development` branch: A feature branch with multiple commits
- `cherry-pick-example` branch: This branch, which will demonstrate cherry-picking

## Commits in Feature Branch

The `feature-development` branch has these commits (in chronological order):

1. "Add initial application structure" - Base code setup
2. "Add configuration file" - Adding configuration settings
3. "Fix critical bug: Add validation to user creation" - Important bug fix
4. "Add user roles and permissions system" - New feature
5. "Security fix: Increase password hashing iterations" - Security improvement

## Which Commits to Cherry-Pick?

Not all commits are good candidates for cherry-picking. Here's what to consider:

### Good Cherry-Pick Candidates:
- **Bug fixes** (like our user validation fix)
- **Security patches** (like our password hashing improvement)
- **Small, isolated changes** that don't depend on other commits

### Poor Cherry-Pick Candidates:
- **Large feature additions** that span multiple files
- **Commits with many dependencies** on other commits
- **Refactoring** that changes multiple components

## Cherry-Pick Process

Here's how to cherry-pick our bug fix and security fix commits:

```bash
# Checkout the target branch (where you want the changes)
git checkout cherry-pick-example

# Cherry-pick the bug fix commit
git cherry-pick <bug-fix-commit-hash>  # ffa95bac593ea9a99f69d47a17df65667d86a2c4

# Cherry-pick the security fix commit
git cherry-pick <security-fix-commit-hash>  # 1bda0b150ee740f73a5c1f531a4ada3870e8ce40
```

## Handling Cherry-Pick Conflicts

Sometimes cherry-picking creates conflicts. Here's how to resolve them:

1. When conflicts occur, git will tell you
2. Edit the conflicted files to resolve the conflicts
3. Add the resolved files with `git add <filename>`
4. Continue the cherry-pick with `git cherry-pick --continue`
5. Or abort with `git cherry-pick --abort` if you change your mind

## Best Practices

1. **Cherry-pick from oldest to newest** commits to minimize conflicts
2. **One fix per commit** makes cherry-picking easier
3. **Use descriptive commit messages** to identify cherry-pick candidates
4. **Test after cherry-picking** to ensure functionality
5. **Document which commits were cherry-picked** for team reference

## Drawbacks of Cherry-Picking

- Can create duplicate commits with different hashes
- May lead to the same fix being applied multiple times
- Can make history harder to follow

## Alternatives to Cherry-Picking

- **Rebasing**: Replay commits on top of another branch
- **Merging**: Bring all changes from one branch into another
- **Feature flags**: Roll out features selectively without branch manipulation
