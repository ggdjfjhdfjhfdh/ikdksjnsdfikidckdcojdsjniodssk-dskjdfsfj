import ArticleLayout from '@/components/wiki/ArticleLayout';
import BackButton from '@/components/BackButton';

export default function ContainerSecurityArticle() {
  return (
    <ArticleLayout 
      title="Seguridad en Kubernetes y Contenedores" 
      backUrl="/recursos/wiki/tecnologias"
    >
      <div className="prose max-w-none">
        <h2>Modelo de Amenazas</h2>
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-red-50 p-3 rounded-lg">
            <h3 className="font-bold text-red-800">Cluster</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>API Server comprometido</li>
              <li>Etcd sin cifrar</li>
              <li>Kubelet vulnerado</li>
            </ul>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <h3 className="font-bold text-orange-800">Runtime</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Breakout de contenedores</li>
              <li>Contenedores maliciosos</li>
              <li>Rootkits en kernels compartidos</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <h3 className="font-bold text-yellow-800">Supply Chain</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Imágenes comprometidas</li>
              <li>Dependencias vulnerables</li>
              <li>CI/CD comprometido</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Controles Clave</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">RBAC</h4>
            <pre className="text-sm mt-2 bg-gray-50 p-2 rounded">
              {`apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]`}
            </pre>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Network Policies</h4>
            <pre className="text-sm mt-2 bg-gray-50 p-2 rounded">
              {`apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
spec:
  podSelector:
    matchLabels:
      role: db
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: app`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Herramientas Recomendadas</h3>
        <div className="grid md:grid-cols-3 gap-4 my-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <h4 className="font-bold">Falco</h4>
            <p className="text-sm mt-1">Detección de anomalías en runtime</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <h4 className="font-bold">Kyverno</h4>
            <p className="text-sm mt-1">Políticas como código</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <h4 className="font-bold">Trivy</h4>
            <p className="text-sm mt-1">Escaneo de vulnerabilidades</p>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
