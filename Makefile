git-commit:
	git add . && git commit -m "patched"
publish: git-commit
	vsce package patch
	vsce publish patch