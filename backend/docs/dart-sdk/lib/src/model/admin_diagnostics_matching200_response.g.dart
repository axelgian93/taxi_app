// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_diagnostics_matching200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminDiagnosticsMatching200Response
    extends AdminDiagnosticsMatching200Response {
  @override
  final bool? postgisAvailable;
  @override
  final AdminDiagnosticsMatching200ResponseEnv? env;
  @override
  final BuiltMap<String, int>? counters;

  factory _$AdminDiagnosticsMatching200Response(
          [void Function(AdminDiagnosticsMatching200ResponseBuilder)?
              updates]) =>
      (AdminDiagnosticsMatching200ResponseBuilder()..update(updates))._build();

  _$AdminDiagnosticsMatching200Response._(
      {this.postgisAvailable, this.env, this.counters})
      : super._();
  @override
  AdminDiagnosticsMatching200Response rebuild(
          void Function(AdminDiagnosticsMatching200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminDiagnosticsMatching200ResponseBuilder toBuilder() =>
      AdminDiagnosticsMatching200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminDiagnosticsMatching200Response &&
        postgisAvailable == other.postgisAvailable &&
        env == other.env &&
        counters == other.counters;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, postgisAvailable.hashCode);
    _$hash = $jc(_$hash, env.hashCode);
    _$hash = $jc(_$hash, counters.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AdminDiagnosticsMatching200Response')
          ..add('postgisAvailable', postgisAvailable)
          ..add('env', env)
          ..add('counters', counters))
        .toString();
  }
}

class AdminDiagnosticsMatching200ResponseBuilder
    implements
        Builder<AdminDiagnosticsMatching200Response,
            AdminDiagnosticsMatching200ResponseBuilder> {
  _$AdminDiagnosticsMatching200Response? _$v;

  bool? _postgisAvailable;
  bool? get postgisAvailable => _$this._postgisAvailable;
  set postgisAvailable(bool? postgisAvailable) =>
      _$this._postgisAvailable = postgisAvailable;

  AdminDiagnosticsMatching200ResponseEnvBuilder? _env;
  AdminDiagnosticsMatching200ResponseEnvBuilder get env =>
      _$this._env ??= AdminDiagnosticsMatching200ResponseEnvBuilder();
  set env(AdminDiagnosticsMatching200ResponseEnvBuilder? env) =>
      _$this._env = env;

  MapBuilder<String, int>? _counters;
  MapBuilder<String, int> get counters =>
      _$this._counters ??= MapBuilder<String, int>();
  set counters(MapBuilder<String, int>? counters) =>
      _$this._counters = counters;

  AdminDiagnosticsMatching200ResponseBuilder() {
    AdminDiagnosticsMatching200Response._defaults(this);
  }

  AdminDiagnosticsMatching200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _postgisAvailable = $v.postgisAvailable;
      _env = $v.env?.toBuilder();
      _counters = $v.counters?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminDiagnosticsMatching200Response other) {
    _$v = other as _$AdminDiagnosticsMatching200Response;
  }

  @override
  void update(
      void Function(AdminDiagnosticsMatching200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminDiagnosticsMatching200Response build() => _build();

  _$AdminDiagnosticsMatching200Response _build() {
    _$AdminDiagnosticsMatching200Response _$result;
    try {
      _$result = _$v ??
          _$AdminDiagnosticsMatching200Response._(
            postgisAvailable: postgisAvailable,
            env: _env?.build(),
            counters: _counters?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'env';
        _env?.build();
        _$failedField = 'counters';
        _counters?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(r'AdminDiagnosticsMatching200Response',
            _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
