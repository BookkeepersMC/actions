# actions
Actions stuff :)

Use in actions:
```yaml
- uses: BookkeepersMC/actions@v1
with:
  github-token: # Github token. Default is ${{ github.token }}. Optional.
  context: # The context (changelog, labeled, or unlabeled). Required.
  workflow_id: # The workflow id. Optional.
  issue-number: # GH issue number. ${{ github.event.number }} is default. Optional
  commit_regex: # Regex to filter commits. Optional.
  label: # What to label with labeled or unlabled. Required for labeled and unlabeled, otherwise optional.
```
