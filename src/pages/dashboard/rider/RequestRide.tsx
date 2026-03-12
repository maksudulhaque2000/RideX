import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { useRequestRideMutation } from '../../../redux/features/ride/rideApi';
import { toast } from 'react-hot-toast';

interface RtkError {
  status: number;
  data: {
    message: string;
    success: boolean;
    error?: unknown;
  };
}

function isRtkError(error: unknown): error is RtkError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as { data: unknown }).data === 'object' &&
    (error as { data: unknown }).data !== null &&
    'message' in ((error as { data: unknown }).data as { message: unknown })
  );
}


const RequestRide = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [requestRide, { isLoading }] = useRequestRideMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Requesting ride...");

        try {
            const parseCoordinates = (coordString: string): number[] => {
                const parts = coordString.split(',').map(part => parseFloat(part.trim()));
                if (parts.length !== 2 || parts.some(isNaN)) {
                    throw new Error('Invalid coordinate format. Please use "latitude, longitude".');
                }
                return parts;
            };

            const pickupCoords = parseCoordinates(data.pickup);
            const destinationCoords = parseCoordinates(data.destination);

            const rideData = {
                pickupLocation: { 
                    type: 'Point',
                    coordinates: pickupCoords
                },
                destinationLocation: { 
                    type: 'Point',
                    coordinates: destinationCoords
                },
                fare: Number(data.fare)
            }
        
            await requestRide(rideData).unwrap();
            toast.success("Ride requested successfully!", { id: toastId });
            reset();
        } catch (error: unknown) {
            toast.dismiss(toastId);

            if (isRtkError(error)) {
                toast.error(error.data.message || "Failed to request ride.");
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unexpected error occurred while requesting the ride.");
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Request a New Ride</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Location (lat,lng)</label>
                    <input
                    type="text"
                    placeholder="e.g., 23.777, 90.399"
                    {...register('pickup', { required: true })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Destination Location (lat,lng)</label>
                    <input
                    type="text"
                    placeholder="e.g., 23.810, 90.412"
                    {...register('destination', { required: true })}
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Offered Fare ($)</label>
                    <input
                        type="number"
                        placeholder="e.g., 10"
                        {...register('fare', { 
                            required: 'Fare is required',
                            min: { value: 1, message: 'Fare must be a positive number' }
                        })}
                        className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    {errors.fare && <p className="text-red-500 text-xs mt-1">{errors.fare.message as string}</p>}
                </div>
                <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400">
                    {isLoading ? "Requesting..." : "Request Ride"}
                </button>
            </form>
        </div>
    )
}
export default RequestRide;