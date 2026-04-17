import appwriteService from "../appwrite/config";

const ratioDimensions = {
  "aspect-[16/11]": { width: 1600, height: 1100 },
  "aspect-[4/3]": { width: 1200, height: 900 },
  "aspect-[21/8]": { width: 2100, height: 800 },
};

function MediaFrame({
  fileId,
  alt,
  ratio = "aspect-[4/3]",
  fit = "cover",
  rounded = "rounded-[28px]",
  className = "",
  imageClassName = "",
  overlay = null,
  fallbackLabel = "No Image",
  fallbackHint = "Media unavailable",
  loading = "lazy",
}) {
  const src = fileId ? appwriteService.getFilePreview(fileId) : null;
  const { width, height } = ratioDimensions[ratio] || ratioDimensions["aspect-[4/3]"];
  const fitClass =
    fit === "contain"
      ? "object-contain p-4 md:p-8"
      : "object-cover";

  return (
    <div
      className={`relative ${ratio} w-full overflow-hidden border border-border bg-bg-secondary ${rounded} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          className={`h-full w-full ${fitClass} ${imageClassName}`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-2 px-4 text-center">
            <span className="font-heading text-2xl text-text-muted/70">
              {fallbackLabel}
            </span>
            <span className="text-xs uppercase tracking-[0.24em] text-text-muted">
              {fallbackHint}
            </span>
          </div>
        </div>
      )}

      {overlay ? <div className="pointer-events-none absolute inset-0">{overlay}</div> : null}
    </div>
  );
}

export default MediaFrame;
