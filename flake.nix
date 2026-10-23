{
  description = "Poly Housing (Next.js + FastAPI)";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
  };

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (
        pkgs:
        let
          lib = pkgs.lib;
        in
        {
          default = pkgs.mkShell {
            packages =
              with pkgs;
              [
                # Frontend
                nodejs_24
                pnpm
                typescript
                typescript-language-server
                tailwindcss-language-server
                vscode-langservers-extracted

                # Backend (Python itself comes from your system; ruff comes from uv's dev group)
                uv
                basedpyright

                # psql client for the Docker Postgres
                postgresql_17
                dbeaver-bin

                # Docker CLI (the daemon runs outside the shell)
                docker-client
                docker-compose

                git
                jq
              ]
              ++ lib.optionals stdenv.isDarwin [ colima ];

            shellHook = ''
              export PATH="$PWD/node_modules/.bin:$PWD/backend/.venv/bin:$PATH"
              export NEXT_TELEMETRY_DISABLED=1

              # uv: use the system Python, never download one
              export UV_PYTHON_PREFERENCE=only-system
              export UV_PYTHON_DOWNLOADS=never

              ${lib.optionalString pkgs.stdenv.isLinux ''
                # Lets prebuilt wheels (uvloop, httptools, argon2...) load on NixOS
                export LD_LIBRARY_PATH="${
                  lib.makeLibraryPath [
                    pkgs.stdenv.cc.cc.lib
                    pkgs.zlib
                  ]
                }''${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
              ''}

              echo "dev shell: pnpm dev | pnpm dev:api | pnpm db:up | pnpm db:migrate"

              if [ -z "$NIX_DEV_ZSH" ] && [[ $- == *i* ]] && [ -z "$DIRENV_IN_ENVRC" ]; then
                export NIX_DEV_ZSH=1
                exec "$(command -v zsh || echo ${pkgs.zsh}/bin/zsh)"
              fi
            '';
          };
        }
      );
    };
}
