LINK="public/blog-posts"
TARGET="../blog-posts"

# 없을 때만 생성
[ -e "$LINK" ] || ln -s "$TARGET" "$LINK"