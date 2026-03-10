#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

MISSING_DEPS=()

command -v git >/dev/null 2>&1 || MISSING_DEPS+=("git")
command -v curl >/dev/null 2>&1 || MISSING_DEPS+=("curl")

if [ ${#MISSING_DEPS[@]} -ne 0 ]; then
    echo -e "${RED}Error: Missing required dependencies:${NC}"

    for dep in "${MISSING_DEPS[@]}"; do
        echo -e "  ${YELLOW}- ${dep}${NC}"
    done

    echo -e "${YELLOW}Please install the missing dependencies and try again${NC}"
    exit 1
fi

echo -e "${YELLOW}Installing gitow...${NC}"

cd /tmp
rm -rf rokucli
git clone https://github.com/skylvie/gitow > /dev/null 2>&1
cd gitow
chmod +x gitow
sudo cp gitow /usr/bin/gitow

echo -e "${GREEN}gitow installed successfully!${NC}"
echo -e "${GREEN} run gitow --help to get started.${NC}"
