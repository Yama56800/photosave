export default function TextInput({ className, id, label, type, autoComplete, onChange, value }) {
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                autoComplete={autoComplete}
                onChange={onChange}
                value={value} />
        </div>
    )
}