//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_payments_top_riders200_response_items_inner.g.dart';

/// AdminPaymentsTopRiders200ResponseItemsInner
///
/// Properties:
/// * [riderId] 
/// * [email] 
/// * [fullName] 
/// * [trips] 
/// * [amountUsd] 
@BuiltValue()
abstract class AdminPaymentsTopRiders200ResponseItemsInner implements Built<AdminPaymentsTopRiders200ResponseItemsInner, AdminPaymentsTopRiders200ResponseItemsInnerBuilder> {
  @BuiltValueField(wireName: r'riderId')
  String? get riderId;

  @BuiltValueField(wireName: r'email')
  String? get email;

  @BuiltValueField(wireName: r'fullName')
  String? get fullName;

  @BuiltValueField(wireName: r'trips')
  int? get trips;

  @BuiltValueField(wireName: r'amountUsd')
  num? get amountUsd;

  AdminPaymentsTopRiders200ResponseItemsInner._();

  factory AdminPaymentsTopRiders200ResponseItemsInner([void updates(AdminPaymentsTopRiders200ResponseItemsInnerBuilder b)]) = _$AdminPaymentsTopRiders200ResponseItemsInner;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminPaymentsTopRiders200ResponseItemsInnerBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminPaymentsTopRiders200ResponseItemsInner> get serializer => _$AdminPaymentsTopRiders200ResponseItemsInnerSerializer();
}

class _$AdminPaymentsTopRiders200ResponseItemsInnerSerializer implements PrimitiveSerializer<AdminPaymentsTopRiders200ResponseItemsInner> {
  @override
  final Iterable<Type> types = const [AdminPaymentsTopRiders200ResponseItemsInner, _$AdminPaymentsTopRiders200ResponseItemsInner];

  @override
  final String wireName = r'AdminPaymentsTopRiders200ResponseItemsInner';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminPaymentsTopRiders200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.riderId != null) {
      yield r'riderId';
      yield serializers.serialize(
        object.riderId,
        specifiedType: const FullType(String),
      );
    }
    if (object.email != null) {
      yield r'email';
      yield serializers.serialize(
        object.email,
        specifiedType: const FullType(String),
      );
    }
    if (object.fullName != null) {
      yield r'fullName';
      yield serializers.serialize(
        object.fullName,
        specifiedType: const FullType(String),
      );
    }
    if (object.trips != null) {
      yield r'trips';
      yield serializers.serialize(
        object.trips,
        specifiedType: const FullType(int),
      );
    }
    if (object.amountUsd != null) {
      yield r'amountUsd';
      yield serializers.serialize(
        object.amountUsd,
        specifiedType: const FullType(num),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminPaymentsTopRiders200ResponseItemsInner object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminPaymentsTopRiders200ResponseItemsInnerBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'riderId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.riderId = valueDes;
          break;
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'fullName':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.fullName = valueDes;
          break;
        case r'trips':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.trips = valueDes;
          break;
        case r'amountUsd':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(num),
          ) as num;
          result.amountUsd = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminPaymentsTopRiders200ResponseItemsInner deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminPaymentsTopRiders200ResponseItemsInnerBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

