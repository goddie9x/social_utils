@echo on
setlocal

rem Save the original directory
set original_dir=%cd%

set dirs=..\..\friend_service\utils ..\..\message_service\utils ..\..\notification_service\utils ..\..\socket_gateway\utils ..\..\user_service\utils

set cmd=git pull origin main

rem Loop through directories
for %%d in (%dirs%) do (
    echo Running command in %%d
    pushd %%d
    %cmd%
    popd
)

echo Back to original directory: %original_dir%
