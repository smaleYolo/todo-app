export const TagList = ({ tags, onTagClick, isSelected }: { tags: string[], onTagClick: (tag: string) => void, isSelected: string | null }) => {

  const variantStyle = {
    default: "bg-blue-500 text-white px-3 py-1 m-1 rounded-full hover:bg-blue-700",
    selected: "bg-purple-500 text-white px-3 py-1 m-1 rounded-full hover:bg-purple-700",
  };

  return (
    <div className="flex flex-wrap justify-center mb-4 h-[200px] overflow-auto">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          className={`${isSelected === tag ? variantStyle['selected'] : variantStyle['default']}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};