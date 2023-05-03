import Label from "../Label"

export default function TextArea({
    label,
    placeholder,
    rows
}) {
    return (
        <div class="mb-6">
            <Label
                label={label}
            />
            <textarea
                rows={rows}
                class="block p-2.5 w-full text-sm text-black bg-gray-50 rounded border-2 border-gray-400"
                placeholder={placeholder}
            >
            </textarea>
        </div>
    )
}