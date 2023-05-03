import Label from "../Label"

export default function TextField({
    label,
    placeholder,
    type,
}) {
    return (
        <div class="mb-6">
            <Label
                label={label}
            />
            <input
                class="border-2 border-gray-400 rounded w-full p-4 text-black leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}