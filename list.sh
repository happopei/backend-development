#!/bin/bash

# Function to check if a file is binary
is_binary() {
    if file "$1" | grep -q "text"; then
        return 1
    else
        return 0
    fi
}

# Set directory path
DIR_PATH="${1:-.}"

# Display directory tree
echo "# Directory Structure:"
echo "#################"
tree -I "__pycache__|*.pyc" "$DIR_PATH" | sed 's/^/# /'
echo "#################"
echo

# Find all files recursively and process them
find "$DIR_PATH" -type f | while read -r file; do
    # Check if file is binary
    if is_binary "$file"; then
        continue
    fi

    # Get relative path
    relative_path="${file#./}"
    
    echo "# $relative_path"
    echo "################################"
    
    # Check if file is readable
    if [ ! -r "$file" ]; then
        echo "Cannot read file: Permission denied"
        echo
        continue
    fi
    
    # Display file contents
    cat "$file" 2>/dev/null || echo "Error reading file"
    
    echo
    echo "################################"
    echo
done