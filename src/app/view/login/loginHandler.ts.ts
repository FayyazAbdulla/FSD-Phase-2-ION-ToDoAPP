// utils/loginHandler.ts
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation


export const loginHandler = async (
    email: string,
    password: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    router: ReturnType<typeof useRouter> // Use ReturnType to infer the correct router type
) => {
    try {
        console.log("Sending POST request to /api/login");

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        console.log("Response Status: ", response.status);

        // Handle different content types to avoid JSON parse errors
        const contentType = response.headers.get("Content-Type") || "";
        let responseData;

        // Check if the response is JSON
        if (contentType.includes("application/json")) {
            responseData = await response.json();
        } else {
            // Fallback for non-JSON responses (e.g., HTML error page)
            responseData = await response.text();
            throw new Error("Unexpected server error. Received HTML response.");
        }

        if (!response.ok) {
            console.log("Error Response Data: ", responseData);
            throw new Error(responseData.message || "Login failed. Please check your credentials.");
        }

        // Process successful response
        console.log("Login Successful. Response Data: ", responseData);
        console.log("Storing token in local storage: ", responseData.token);
        localStorage.setItem("token", responseData.token);

        await Swal.fire({
            title: "Success!",
            text: "Login successful!",
            icon: "success",
            confirmButtonText: "Okay",
        });

        console.log("Redirecting to /view/todo");
        router.push("/view/todo");

    } catch (err) {
        let errorMessage = "An unknown error occurred";

        if (err instanceof Error) {
            errorMessage = err.message;
        }

        console.error("Caught Error: ", err);
        console.log("Error Message: ", errorMessage);

        setError(errorMessage);

        await Swal.fire({
            title: "Error!",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "Try Again",
        });
    }
};
