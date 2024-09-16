@echo on
setlocal

rem Save the original directory
set original_dir=%cd%

rem Set directories for services
set dirs=..\..\friend_service\utils ..\..\message_service\utils ..\..\notification_service\utils ..\..\socket_gateway\utils ..\..\user_service\utils

rem Default command for git pull
set cmd=git pull origin main

rem Check if "force" flag is passed
if "%1"=="f" (
    rem Ensure the second parameter (number) is provided
    if "%2"=="" (
        echo Error: You must provide a number for the force reset.
        exit /b 1
    )
    rem Set the force reset command using the provided number
    set force_reset=git reset --hard head~%2
) else (
    rem No force flag, only pull
    set force_reset=
)

rem Loop through directories
for %%d in (%dirs%) do (
    echo Running commands in %%d
    pushd %%d

    rem Check if force_reset is not an empty string
    if not "%force_reset%"=="" (
        echo Executing: %force_reset%
        %force_reset%
    )

    echo Executing: %cmd%
    %cmd%
    
    popd
)

echo Back to original directory: %original_dir%
