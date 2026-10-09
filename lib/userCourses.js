// マイノートへの教材追加（user_courses テーブル）
// テーブル未作成などで失敗しても学習の邪魔にならないよう、エラーは握りつぶして false を返す
export async function addCourseToNotes(supabase, userId, courseId) {
  if (!supabase || !userId || !courseId) return false;
  const { error } = await supabase
    .from('user_courses')
    .upsert({ user_id: userId, course_id: courseId }, { onConflict: 'user_id,course_id', ignoreDuplicates: true });
  return !error;
}
