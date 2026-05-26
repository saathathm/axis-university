import Select from "react-select";

const SearchableSelect = ({
  label,
  options = [],
  placeholder = "Search...",
  onChange,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>

      <Select
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        className="text-sm"
        styles={{
          control: (base, state) => ({
            ...base,
            minHeight: "45px",
            borderRadius: "1rem",
            borderColor: state.isFocused ? "#6366f1" : "#e5e7eb",
            boxShadow: "none",
            backgroundColor: "transparent",
            paddingLeft: "0.25rem",
            fontSize: "0.875rem",
            "&:hover": {
              borderColor: "#6366f1",
            },
          }),

          valueContainer: (base) => ({
            ...base,
            padding: "0 0.5rem",
          }),

          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),

          placeholder: (base) => ({
            ...base,
            color: "#9ca3af",
          }),

          menu: (base) => ({
            ...base,
            borderRadius: "1rem",
            overflow: "hidden",
            zIndex: 20,
          }),
        }}
      />
    </div>
  );
};

export default SearchableSelect;
