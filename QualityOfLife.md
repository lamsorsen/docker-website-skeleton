# Linux Quality of Life Notes
How to quickly make your dev environment on your Droplet a little nicer.
1. `ssh` to your droplet.
1. `vim setup.sh`
1. `:set paste`
1. `i` to go into insert mode
1. Paste the following:
```
#!bin/bash

# This script configures a few quality-of-life things for developing via
# command line.
# Only run this script once, it might do weird things if you run it multiple times.
# Usage: ./setup.sh My.Email@gmail.com github_username
# Ex: ./setup.sh jfs1744@gmail.com lamsorsen

email=$1
username=$2

# Vim config!
vimrc="set background=dark
set expandtab
set tabstop=2
set softtabstop=2
set shiftwidth=2
set number
autocmd FileType python setlocal shiftwidth=4 tabstop=4 softtabstop=4

execute pathogen#infect()
syntax on
filetype plugin indent on
let g:jsx_ext_required = 0

autocmd FileType yaml setlocal indentkeys-=<:>"
echo "$vimrc" > ~/.vimrc
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
    curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim
git clone https://github.com/pangloss/vim-javascript.git ~/.vim/bundle/vim-javascript
git clone https://github.com/mxw/vim-jsx.git ~/.vim/bundle/vim-jsx


# Add some aliases to the bashrc!
aliases='
alias gs="git status"
alias gpush="git push"
alias gc="git commit -m"
alias gpushset="git push --set-upstream origin HEAD"
alias dc="docker-compose"
alias snap="docker-compose -f docker-compose.snapshot.yml"
alias victoria="docker-compose -p victoria -f docker-compose.victoria.yml"
'
echo "$aliases" >> ~/.bashrc

# Make git colorful!
gitconfig="[color]
    diff = auto
    status = auto
    branch = auto
    interactive = auto
    ui = auto
    pager = true

[user]
  name = $username
  email = $email
[push]
  default = simple
"
echo "$gitconfig" > ~/.gitconfig
```
1. `:x` to save and quit.
1. `chmod 755 setup.sh`
1. Run the following but substitute in your email and your github username: `./setup.sh My.Email@gmail.com github_username`
1. `rm setup.sh` to clean up.
1. `exit` and `ssh` back to your node to refresh some config.
