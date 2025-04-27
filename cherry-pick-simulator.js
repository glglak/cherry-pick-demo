#!/usr/bin/env node

/**
 * Cherry-Pick Simulator
 * 
 * This script demonstrates the concept of cherry-picking in Git
 * by simulating the process with visual output.
 */

// Simulated repository state
const repository = {
  branches: {
    main: {
      name: 'main',
      commits: [
        { hash: 'a1b2c3d', message: 'Initial commit', files: ['README.md'] }
      ]
    },
    feature: {
      name: 'feature-development',
      commits: [
        { hash: 'a1b2c3d', message: 'Initial commit', files: ['README.md'] },
        { hash: '53d7d97', message: 'Add initial application structure', files: ['src/app.js'] },
        { hash: 'c6a53ff', message: 'Add configuration file', files: ['src/config.js'] },
        { hash: 'ffa95ba', message: 'Fix critical bug: Add validation to user creation', files: ['src/app.js'], type: 'bugfix' },
        { hash: '7009d4d', message: 'Add user roles and permissions system', files: ['src/user-roles.js'] },
        { hash: '1bda0b1', message: 'Security fix: Increase password hashing iterations', files: ['src/auth.js'], type: 'security' }
      ]
    },
    'cherry-pick': {
      name: 'cherry-pick-example',
      commits: [
        { hash: 'a1b2c3d', message: 'Initial commit', files: ['README.md'] },
        { hash: 'b9527ba', message: 'Add comprehensive cherry-pick guide', files: ['CHERRY-PICK-GUIDE.md'] },
        { hash: 'a561c2a', message: 'Add visual cherry-pick diagram', files: ['CHERRY-PICK-DIAGRAM.md'] }
      ]
    }
  },
  HEAD: 'cherry-pick'
};

// Utility functions for display
function displayHeader(text) {
  console.log('\n\x1b[1m\x1b[36m=== ' + text + ' ===\x1b[0m');
}

function displayBranch(branch) {
  console.log(`\x1b[1m\x1b[32m${branch.name}\x1b[0m`);
  branch.commits.forEach(commit => {
    const type = commit.type ? `[${commit.type.toUpperCase()}] ` : '';
    const colorStart = commit.type === 'bugfix' ? '\x1b[33m' : 
                       commit.type === 'security' ? '\x1b[31m' : '\x1b[0m';
    const colorEnd = '\x1b[0m';
    
    console.log(`  ${commit.hash} ${colorStart}${type}${commit.message}${colorEnd}`);
    
    // Display files changed
    commit.files.forEach(file => {
      console.log(`    - ${file}`);
    });
  });
}

function simulateCherryPick(sourceCommitHash) {
  // Find the commit in the feature branch
  const sourceBranch = repository.branches.feature;
  const targetBranch = repository.branches['cherry-pick'];
  
  const commitIndex = sourceBranch.commits.findIndex(c => c.hash === sourceCommitHash);
  if (commitIndex === -1) {
    console.log(`\x1b[31mCommit ${sourceCommitHash} not found!\x1b[0m`);
    return false;
  }
  
  const commit = sourceBranch.commits[commitIndex];
  
  // Create a new commit hash (simulating how Git creates a new commit)
  const newHash = sourceCommitHash.split('').reverse().join('');
  
  // Copy the commit to the target branch with the new hash
  const newCommit = { 
    ...commit,
    hash: newHash,
    message: `Cherry-pick: ${commit.message}`
  };

  targetBranch.commits.push(newCommit);
  
  console.log(`\x1b[32mSuccessfully cherry-picked commit ${sourceCommitHash}\x1b[0m`);
  console.log(`Original commit: ${commit.message}`);
  console.log(`New commit: ${newCommit.message} (${newHash})`);
  return true;
}

// Main script execution
displayHeader('REPOSITORY STATE BEFORE CHERRY-PICK');
displayBranch(repository.branches.main);
displayBranch(repository.branches.feature);
displayBranch(repository.branches['cherry-pick']);

// Simulate cherry-picking the bug fix commit
displayHeader('CHERRY-PICKING BUG FIX COMMIT');
simulateCherryPick('ffa95ba');

// Simulate cherry-picking the security fix commit
displayHeader('CHERRY-PICKING SECURITY FIX COMMIT');
simulateCherryPick('1bda0b1');

// Display final state
displayHeader('REPOSITORY STATE AFTER CHERRY-PICK');
displayBranch(repository.branches['cherry-pick']);

displayHeader('CHERRY-PICK SUMMARY');
console.log(`
Cherry-picking allows you to select specific commits from one branch
and apply them to another branch. This is useful when:

1. You need to apply a bug fix to multiple branches
2. You want to incorporate specific changes without merging entire branches
3. You need to backport features to maintenance versions

The key advantage is selectivity - you can choose exactly which changes
to bring over, rather than merging entire branches.
`);

console.log(`
To perform a cherry-pick in Git:

git checkout target-branch
git cherry-pick <commit-hash>

To cherry-pick without automatically committing:
git cherry-pick -n <commit-hash>

To include a reference to the original commit:
git cherry-pick -x <commit-hash>
`);
