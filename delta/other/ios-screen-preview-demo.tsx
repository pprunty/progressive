import { IosScreenPreview } from './ios-screen-preview';

export function IosScreenPreviewDemo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Demo: Ios Screen Preview</h3>
      <div className="p-6 border rounded-lg bg-slate-50 dark:bg-slate-900">
        <IosScreenPreview />
      </div>
    </div>
  );
}
