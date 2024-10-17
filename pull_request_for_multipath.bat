@echo on
setlocal

set original_dir=%cd%

set dirs=..\..\comment_service\utils ..\..\friend_service\utils ..\..\message_service\utils ..\..\notification_service\utils ..\..\socket_gateway\utils ..\..\user_service\utils ..\..\reaction_service\utils ..\..\group_service\utils ..\..\page_service\utils

set cmd=git pull origin main

if "%1"=="f" (
    if "%2"=="" (
        echo Error: You must provide a number for the force reset.
        exit /b 1
    )
    set force_reset=git reset --hard head~%2
) else (
    set force_reset=
)

for %%d in (%dirs%) do (
    echo Running commands in %%d
    pushd %%d

    if not "%force_reset%"=="" (
        echo Executing: %force_reset%
        %force_reset%
    )

    echo Executing: %cmd%
    %cmd%
    
    popd
)

echo Back to original directory: %original_dir%
