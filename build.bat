node -v >nul 2>&1 && (
    npm -v >nul 2>&1 && (
        cls
        npm run build
    ) || (
        cls
        echo npm is not installed.
        pause
    )
) || (
    cls
    echo nodejs is not installed.
    pause
)