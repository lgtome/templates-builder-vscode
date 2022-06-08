git-commit:
	git add . && git commit -m "patched"
publish: git-commit
	vsce publish patch