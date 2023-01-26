const Social = ({ allfields, details }) => {
  return (
    <div className="w-full md:w-[calc(100%/2-16px)]">
      <h1 className="text-2xl font-semibold text-black dark:text-dark-heading_color">
        Social Info
      </h1>
      {allfields.social.map((field) => {
        return (
          <div className="my-4" key={field._id}>
            <label
              htmlFor={field._id}
              className="block mb-1 text-light-paragraph_color dark:text-dark-paragraph_color"
            >
              {field.label}
            </label>
            {field.type === "INPUT" ? (
              <input
                id={field._id}
                type="text"
                value={
                  field.path
                    ? details[field.path][field.name] || ""
                    : details[field.name] || ""
                }
                name={field.name}
                placeholder={field.placeholder}
                onChange={field.onChange}
                className="input"
                data-isnested={field.path}
              />
            ) : (
              field.type === "TEXTAREA" && (
                <textarea
                  id={field._id}
                  value={
                    field.path
                      ? details[field.path][field.name] || ""
                      : details[field.name] || ""
                  }
                  name={field.name}
                  onChange={field.onChange}
                  placeholder={field.placeholder}
                  className="textarea"
                  data-isnested={field.path}
                />
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Social;
