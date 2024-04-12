import appConfig from "@/config/app";
import RentOutFormData from "@/types/RentOutFormData";

async function submitForm(formData: RentOutFormData): Promise<{ ok: boolean, body: {}, headers: {} }>
{
    const url = new URL('/api/applications/', appConfig.backendBase);
    const body = new FormData();

    Object.entries(formData).forEach(([key, value]: [string, string]) => body.append(key, value));

    const response = await fetch(url.toString(), {
        method: 'POST',
        body,
    });

    if (!response.ok) {
        throw new Error('Failed to submit form');
    }

    return {
        ok: response.ok,
        body: await response.json(),
        headers: response.headers,
    };
}

export default function useRentForm() {
    const submit = async (formData: RentOutFormData): Promise<{}> => {
        try {
            return await submitForm(formData);
        } catch (error: any) {
            return new Promise((): { ok: boolean, error: any } => {
                return {
                    ok: false,
                    error
                };
            });
        }
    };

    return { submit };
}

