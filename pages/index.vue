<script>
export default {
  middleware({ redirect } ) {
    return redirect('/device/helm.cattle.io.v1.helmchart');
  }
};
</script>
